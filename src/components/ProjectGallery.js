import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../css/project__gallery.css";
import projectList from "../projects.json";

gsap.registerPlugin(ScrollTrigger);

function ProjectGallery() {
  const galleryRef = useRef(null);

  useGSAP(
    () => {
      // fromTo makes both start and end states explicit.
      // invalidateOnRefresh: true → GSAP re-applies the start state on
      // every ScrollTrigger.refresh() call, so positions are always correct
      // even when images above push the page taller after load.
      // once: true  → animation plays once and won't reverse on scroll-up.
      gsap.fromTo(
        ".title",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
            invalidateOnRefresh: true,
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".project__item",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".project__grid",
            start: "top 80%",
            invalidateOnRefresh: true,
            once: true,
          },
        }
      );

      // ── 3D Cursor-Driven Perspective Tilt ─────────────────────────────────
      const items = gsap.utils.toArray(galleryRef.current.querySelectorAll(".project__item"));
      const cleanups = [];

      items.forEach((item) => {
        const inner = item.querySelector(".project__inner");

        const handleMouseMove = (e) => {
          const rect = item.getBoundingClientRect();
          // Calculate mouse position relative to the center of the element (-0.5 to 0.5)
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          // Animate the tilt based on cursor position
          gsap.to(inner, {
            duration: 0.4,
            rotateY: x * 15, // Max 7.5 deg rotation
            rotateX: -y * 15,
            transformPerspective: 1000,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleMouseLeave = () => {
          // Reset the tilt when mouse leaves
          gsap.to(inner, {
            duration: 0.7,
            rotateY: 0,
            rotateX: 0,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto",
          });
        };

        item.addEventListener("mousemove", handleMouseMove);
        item.addEventListener("mouseleave", handleMouseLeave);

        cleanups.push(() => {
          item.removeEventListener("mousemove", handleMouseMove);
          item.removeEventListener("mouseleave", handleMouseLeave);
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: galleryRef }
  );

  // Refresh ScrollTrigger AFTER the browser has finished loading all
  // resources (images, fonts). We use two rAF calls so the refresh runs
  // in the same frame that the browser paints the fully-laid-out page.
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



  return (
    <section className="project__gallery" ref={galleryRef} style={{ position: "relative" }}>
      {/* Ambient background glows for Glassmorphism */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <h2 className="title">Projects Gallery</h2>
      <a href="#/" className="inline__link archieve__link">
        Featured Project
      </a>

      <ul className="project__grid">
        {projectList.map((project) => (
          <li className="project__item" key={project.title}>
            <div className="project__inner">
              <header>
                <div className="project__top">
                  <div className="folder">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-folder"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <title>Folder</title>
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className="project__link">
                    <a
                      href={project.url}
                      aria-label="GitHub Link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-github"
                        style={{ width: "20px", height: "20px" }}
                      >
                        <title>GitHub</title>
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a
                      href={project.url}
                      aria-label="External Link"
                      className="external"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-external-link"
                        style={{ width: "20px", height: "20px" }}
                      >
                        <title>External Link</title>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
                <h3 className="project__title">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a>
                </h3>
                <div className="project__description">
                  <p>{project.desc}</p>
                </div>
              </header>
              <footer>
                <ul className="project__tech__list">
                  {project.resources.map((resource) => (
                    <li>{resource}</li>
                  ))}
                </ul>
              </footer>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProjectGallery;

