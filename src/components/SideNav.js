import "../css/sidenav.css";
import ResumeBtn from "./ResumeBtn";

function SideNav() {
  return (
    <aside aria-hidden="true" tabIndex="-1" className="menu__small_aside">
      <nav>
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
        <ResumeBtn padding="18px 50px" />
      </nav>
    </aside>
  );
}

export default SideNav;
