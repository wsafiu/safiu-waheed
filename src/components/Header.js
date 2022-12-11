import SideNav from "./SideNav";
import ResumeBtn from "./ResumeBtn";

import "../css/header.css";

function Header() {
  const toggleSideNav = (e) => {
    const sidenav = document.querySelector(".menu__small_aside");

    sidenav.classList.toggle("show_side_nav");
    console.log(sidenav.classList);

    console.log("Change Icon");
    e.currentTarget.classList.toggle("menu__small__btn");
    e.currentTarget.classList.toggle("menu__small__btn__cancel");
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <a href="/" aria-label="home">
            <img src="/mylogo.png" alt="" />
          </a>
        </div>
        <div className="menu">
          <ol>
            <li data-aos="fade-down">
              <a href="/#about">About</a>
            </li>
            <li data-aos="fade-down" data-aos-delay="100">
              <a href="/#experience">Experience</a>
            </li>
            <li data-aos="fade-down" data-aos-delay="200">
              <a href="/#projects">Work</a>
            </li>
            <li data-aos="fade-down" data-aos-delay="300">
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
