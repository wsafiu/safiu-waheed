import { useEffect, useRef } from "react";
import "../css/cursor.css";

const ZOOM = 2;    // magnification level
const SIZE = 130;  // lens diameter in px

function CustomCursor() {
  const lensRef  = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const lens  = lensRef.current;
    const inner = innerRef.current;

    // ── Build a scaled clone of the page inside the lens ─────────
    let cloneEl = null;

    const buildClone = () => {
      const app = document.querySelector(".App");
      if (!app) return;

      inner.innerHTML = "";
      const clone = app.cloneNode(true);

      // Remove the lens itself from the clone (avoid infinite nesting)
      clone.querySelectorAll(".cursor__lens, .cursor__ring").forEach((el) =>
        el.remove()
      );

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
    };

    buildClone();

    // ── Sync dynamic content (GSAP typewriter text) via RAF ───────
    let rafId;
    const syncLoop = () => {
      if (cloneEl) {
        const src   = document.getElementById("stack");
        const copy  = cloneEl.querySelector("#stack");
        if (src && copy && copy.textContent !== src.textContent) {
          copy.textContent = src.textContent;
        }
      }
      rafId = requestAnimationFrame(syncLoop);
    };
    rafId = requestAnimationFrame(syncLoop);

    // ── Track mouse ───────────────────────────────────────────────
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;
      const sx   = window.scrollX;
      const sy   = window.scrollY;
      const half = SIZE / 2;

      // Centre the lens on the pointer
      lens.style.left = `${x}px`;
      lens.style.top  = `${y}px`;

      // Offset the clone so the scaled document point (x+sx, y+sy)
      // appears at the centre of the circular viewport
      inner.style.left = `${-(x + sx) * ZOOM + half}px`;
      inner.style.top  = `${-(y + sy) * ZOOM + half}px`;
    };

    const onLeave = () => lens.classList.add("is-hidden");
    const onEnter = () => lens.classList.remove("is-hidden");

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Rebuild clone after a short delay so React has fully painted
    const initTimer = setTimeout(buildClone, 500);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
      clearTimeout(initTimer);
    };
  }, []);

  return (
    <div ref={lensRef} className="cursor__lens is-hidden" aria-hidden="true">
      <div ref={innerRef} className="cursor__lens-inner" />
    </div>
  );
}

export default CustomCursor;


