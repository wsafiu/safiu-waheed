import { useEffect, useRef } from "react";
import "../css/cursor.css";

const ZOOM = 2;   // magnification level
const SIZE = 130; // lens diameter in px

function CustomCursor() {
  const lensRef  = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const lens  = lensRef.current;
    const inner = innerRef.current;

    let cloneEl      = null;
    let elementPairs = []; // [[liveEl, cloneEl], …] built once per clone

    // ── NodeFilter that skips the cursor lens subtree ─────────────
    // Used on the live-tree walker so it stays in sync with the
    // clone walker (the clone never had cursor elements).
    const cursorFilter = {
      acceptNode(node) {
        if (
          node.classList?.contains("cursor__lens") ||
          node.classList?.contains("cursor__ring")
        ) {
          return NodeFilter.FILTER_REJECT; // skip entire subtree
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    };

    // ── Build a full DOM clone and pair every live↔clone element ──
    const buildClone = () => {
      const app = document.querySelector(".App");
      if (!app) return;

      inner.innerHTML = "";
      const clone = app.cloneNode(true);

      // Remove lens from clone (prevents infinite nesting)
      clone
        .querySelectorAll(".cursor__lens, .cursor__ring")
        .forEach((el) => el.remove());

      clone.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: ${document.documentElement.scrollWidth}px;
        pointer-events: none;
        user-select: none;
        transform-origin: 0 0;
        transform: scale(${ZOOM});
      `;

      inner.appendChild(clone);
      cloneEl = clone;

      // ── Build element pairs in one pass ────────────────────────
      // Both walkers visit elements in identical document order
      // because the clone is a structural copy. The live walker
      // skips the cursor subtree (which the clone doesn't have),
      // keeping the two walkers in step.
      elementPairs = [];

      const srcWalker = document.createTreeWalker(
        app,
        NodeFilter.SHOW_ELEMENT,
        cursorFilter
      );
      const clnWalker = document.createTreeWalker(
        cloneEl,
        NodeFilter.SHOW_ELEMENT
      );

      let s = srcWalker.nextNode();
      let c = clnWalker.nextNode();

      while (s && c) {
        elementPairs.push([s, c]);
        s = srcWalker.nextNode();
        c = clnWalker.nextNode();
      }
    };

    // ── RAF sync loop ─────────────────────────────────────────────
    // Runs every frame and mirrors two kinds of live changes to the clone:
    //
    //  1. Typewriter text (#stack) — content change
    //  2. GSAP inline styles     — GSAP mutates element.style directly
    //     (opacity, transform, visibility, etc.). The clone froze the
    //     initial "from" state; we mirror the current animated value
    //     every frame so sections appear correctly in the lens as they
    //     animate in on scroll.
    let rafId;

    const syncLoop = () => {
      if (cloneEl) {
        // 1. Sync typewriter text
        const src  = document.getElementById("stack");
        const copy = cloneEl.querySelector("#stack");
        if (src && copy && copy.textContent !== src.textContent) {
          copy.textContent = src.textContent;
        }

        // 2. Sync GSAP-animated inline styles (the core fix)
        for (const [srcEl, clnEl] of elementPairs) {
          const liveCss  = srcEl.style?.cssText ?? "";
          const cloneCss = clnEl.style?.cssText ?? "";
          if (liveCss !== cloneCss) {
            clnEl.style.cssText = liveCss;
          }
        }
      }

      rafId = requestAnimationFrame(syncLoop);
    };

    // ── Mouse tracking ─────────────────────────────────────────────
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;
      const sx   = window.scrollX;
      const sy   = window.scrollY;
      const half = SIZE / 2;

      lens.style.left = `${x}px`;
      lens.style.top  = `${y}px`;

      inner.style.left = `${-(x + sx) * ZOOM + half}px`;
      inner.style.top  = `${-(y + sy) * ZOOM + half}px`;
    };

    const onLeave = () => lens.classList.add("is-hidden");
    const onEnter = () => lens.classList.remove("is-hidden");

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Rebuild clone on resize (page width may change)
    const onResize = () => buildClone();
    window.addEventListener("resize", onResize);

    // ── Initialisation strategy ────────────────────────────────────
    // Build the clone (and start syncing) after the full page load so
    // that images and fonts have been sized and React has committed all
    // child renders.  On HMR reloads readyState is already "complete".
    const init = () => {
      buildClone();
      rafId = requestAnimationFrame(syncLoop);
    };

    if (document.readyState === "complete") {
      init();
    } else {
      window.addEventListener("load", init, { once: true });
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", init);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={lensRef} className="cursor__lens is-hidden" aria-hidden="true">
      <div ref={innerRef} className="cursor__lens-inner" />
    </div>
  );
}

export default CustomCursor;
