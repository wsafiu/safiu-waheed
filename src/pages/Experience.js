import { useState, useRef, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tab from "../components/Tab";
import Content from "../components/Content";

import "../css/experience.css";

gsap.registerPlugin(ScrollTrigger);

// Scroll distance (px) consumed per panel-to-panel transition.
// Increase for a slower, more deliberate feel.
const SCROLL_PER_PANEL = 700;

// Height of each content panel (px). Must match CSS var(--exp-panel-h).
const PANEL_H = 300;

function Experience() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const stRef      = useRef(null); // ScrollTrigger instance for tab-click navigation

  const experiences = [
    {
      tabTitle: "Stackron",
      companyName: "Stackron",
      title: "Backend Engineer",
      type: "Contract",
      date: "Oct 2025  –  April 2026",
      url: "https://www.stackron.com",
      roles: [
        `Engineered secure authentication and authorization systems, improving
        system integrity and access reliability by implementing structured RBAC
        and ABAC models.`,
        `Built scalable backend and communication services for order and payment
        workflows, improving transaction reliability and service stability in
        high-usage environments.`,
        `Designed product and inventory systems with filtering and bulk operations,
        improving data processing efficiency and system responsiveness.`,
      ],
    },
    {
      tabTitle: "Kodek",
      companyName: "Kodek Innovation",
      title: "Fullstack Engineer",
      type: "Full Time",
      date: "May 2024  –  Mar 2026",
      url: "https://kodekinnovations.com/",
      roles: [
        `Redesigned a legacy platform into a modern client-server architecture,
        improving scalability, maintainability, and system communication efficiency.`,
        `Implemented reporting systems, enhancing data visibility and operational
        monitoring capabilities for business-critical processes.`,
        `Diagnosed and resolved production server and infrastructure issues
        on VPS environments, improving uptime, system reliability, and operational stability.`,
        `Rebuilt frontend modules to improve responsiveness,
        contributing to better system usability and performance stability.`,
      ],
    },
    {
      tabTitle: "Techies",
      companyName: "Techies Info System",
      title: "Backend Engineer",
      type: "Remote",
      date: "April 2022  –  Mar 2024",
      url: "https://techiesinfosystem.com/",
      roles: [
        `Developed background job processing systems using Hangfire, improving
        task scheduling reliability and system uptime in a core banking environment.`,
        `Resolved security vulnerabilities, strengthening system compliance
        and operational safety standards.`,
        `Built real-time communication systems, improving data flow efficiency
        and system interaction reliability.`,
        `Contributed to financial systems handling sensitive transactions,
        ensuring data integrity and fault tolerance.`,
      ],
    },
  ];

  const numPanels = experiences.length;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track   = section.querySelector(".tab__contents-track");

      // ── 1. Entry animations (run once as section scrolls into view) ───
      gsap.fromTo(
        "h2",
        { y: -20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true, invalidateOnRefresh: true },
        }
      );
      gsap.fromTo(
        ".tablist",
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true, invalidateOnRefresh: true },
        }
      );
      gsap.fromTo(
        ".tab__contents",
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true, invalidateOnRefresh: true },
        }
      );

      // ── 2. Build the overscroll timeline ──────────────────────────────
      // The track slides up by PANEL_H px per step, revealing each panel.
      const tl = gsap.timeline().to(track, {
        y: -PANEL_H * (numPanels - 1),
        ease: "none",
      });

      // ── 3. Pin the section + bind the timeline to scroll ─────────────
      stRef.current = ScrollTrigger.create({
        trigger: section,
        // "top top+=100" → pin starts when section top hits 100px from
        // the viewport top (i.e. just below the 100px fixed nav).
        start: "top top+=100",
        end: `+=${(numPanels - 1) * SCROLL_PER_PANEL}`,
        pin: true,
        pinSpacing: true,
        animation: tl,
        scrub: 0.7,
        invalidateOnRefresh: true,
        snap: numPanels > 1
          ? {
              snapTo: 1 / (numPanels - 1),
              duration: { min: 0.2, max: 0.5 },
              ease: "power1.inOut",
              delay: 0.05,
            }
          : false,
        // Keep the active tab in sync with scroll position
        onUpdate(self) {
          const next = Math.round(self.progress * (numPanels - 1));
          setActive((prev) => (prev === next ? prev : next));
        },
      });
    },
    { scope: sectionRef }
  );

  // Refresh ScrollTrigger after all images/fonts settle
  useEffect(() => {
    const refresh = () =>
      requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, { once: true });
    }
    return () => window.removeEventListener("load", refresh);
  }, []);

  // ── Tab click → scroll the page to the right panel position ─────────
  // The ScrollTrigger pin occupies scroll range [st.start → st.end].
  // Panel i lives at  start + (i / (n-1)) * (end - start).
  const setActiveTab = useCallback(
    (e) => {
      const idx = Number(e.currentTarget.dataset.target);
      const st  = stRef.current;

      if (!st) {
        // Fallback before GSAP is ready (e.g., during SSR or HMR)
        setActive(idx);
        return;
      }

      if (numPanels <= 1) {
        setActive(idx);
        return;
      }

      const scrollPos =
        st.start + (idx / (numPanels - 1)) * (st.end - st.start);

      window.scrollTo({ top: scrollPos, behavior: "smooth" });
    },
    [numPanels]
  );

  return (
    <section id="experience" ref={sectionRef}>
      <h2 className="number-heading">Where I've Worked</h2>

      <div className="inner">
        {/* ── Left: clickable tab list ── */}
        <div className="tablist" role="tablist" aria-label="Experience tabs">
          {experiences.map((experience, i) => (
            <Tab
              experience={experience}
              key={i}
              active={i === active}
              id={i}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>

        {/* ── Right: overscroll panel viewport ── */}
        <div className="tab__contents-wrap">
          <div className="tab__contents">
            {/* GSAP translates this track to reveal each panel */}
            <div className="tab__contents-track">
              {experiences.map((experience, i) => (
                <Content
                  experience={experience}
                  active={i === active}
                  key={i}
                  id={i}
                />
              ))}
            </div>
          </div>

          {/* Progress dots — click to jump to a panel */}
          <div className="exp__dots" aria-hidden="true">
            {experiences.map((_, i) => (
              <button
                key={i}
                className={`exp__dot${i === active ? " active" : ""}`}
                data-target={i}
                onClick={setActiveTab}
                tabIndex={-1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
