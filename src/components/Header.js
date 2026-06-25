import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SideNav from "./SideNav";
import ResumeBtn from "./ResumeBtn";

import "../css/header.css";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work",       href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

/**
 * The cursor-glass clones the entire .App DOM — including all section IDs.
 * Since the clone is inserted first in the tree, a plain querySelector('#about')
 * returns the cloned element (inside a fixed lens) and scrollIntoView does
 * nothing on the main viewport.
 *
 * This helper skips any match that lives inside .cursor__lens.
 */
function findRealElement(selector) {
  return Array.from(document.querySelectorAll(selector)).find(
    (el) => !el.closest(".cursor__lens")
  );
}

function Header() {
  const navRef = useRef(null);
  const [active, setActive] = useState("");

  useGSAP(
    () => {
      gsap.from(".nav .menu ol li", {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.3,
      });

      gsap.from(".nav .logo", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".resume-btn", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.7,
      });
    },
    { scope: navRef }
  );

  // ── Scroll-spy: highlight the nav link whose section is in view ──
  useEffect(() => {
    const headerHeight =
      document.querySelector(".header")?.offsetHeight ?? 100;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const hash = "#" + entry.target.id;
            setActive(hash);
            // Update URL hash as user scrolls — replaceState so we
            // don't spam the browser history stack on every scroll event
            window.history.replaceState(null, "", hash);
          }
        });
      },
      {
        rootMargin: `-${headerHeight + 10}px 0px -55% 0px`,
        threshold: 0,
      }
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = findRealElement(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Smooth-scroll to section, skipping the cursor-clone duplicates ──
  const scrollToSection = (href) => {
    const target = findRealElement(href);
    if (!target) return;

    const headerHeight =
      document.querySelector(".header")?.offsetHeight ?? 100;

    // getBoundingClientRect gives the position relative to the viewport;
    // add scrollY to get the absolute document position, then subtract
    // the fixed header height so the section heading isn't hidden behind it.
    const top =
      target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top, behavior: "smooth" });
    window.history.pushState(null, "", href);
    setActive(href);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const toggleSideNav = (e) => {
    const sidenav = document.querySelector(".menu__small_aside");
    sidenav.classList.toggle("show_side_nav");
    e.currentTarget.classList.toggle("menu__small__btn");
    e.currentTarget.classList.toggle("menu__small__btn__cancel");
  };

  return (
    <header className="header" ref={navRef}>
      <nav className="nav">
        <div className="logo">
          <a
            href="/"
            aria-label="home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/");
              setActive("");
            }}
          >
            <img src="/mylogo.png" alt="" />
          </a>
        </div>

        <div className="menu">
          <ol>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={active === href ? "nav-active" : ""}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
          <ResumeBtn />
        </div>

        <div className="menu__small">
          <div>
            <button
              aria-label="Menu"
              className="menu__small__btn"
              onClick={toggleSideNav}
            >
              <div className="ham-box">
                <div className="ham-box-inner"></div>
              </div>
            </button>
            <SideNav onNavClick={handleNavClick} activeHref={active} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
