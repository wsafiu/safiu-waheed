import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SideNav from "./SideNav";
import ResumeBtn from "./ResumeBtn";

import "../css/header.css";

function Header() {
  const navRef = useRef(null);

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
          <a href="/" aria-label="home">
            <img src="/mylogo.png" alt="" />
          </a>
        </div>
        <div className="menu">
          <ol>
            <li>
              <a href="/#about">About</a>
            </li>
            <li>
              <a href="/#experience">Experience</a>
            </li>
            <li>
              <a href="/#projects">Work</a>
            </li>
            <li>
              <a href="/#contact">Contact</a>
            </li>
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
            <SideNav />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
