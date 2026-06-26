import "../css/sidenav.css";
import ResumeBtn from "./ResumeBtn";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function SideNav({ onNavClick, activeHref }) {
  const handleClick = (e, href) => {
    // Close the side nav first
    const sidenav = document.querySelector(".menu__small_aside");
    const btn = document.querySelector(
      ".menu__small__btn__cancel, .menu__small__btn"
    );
    if (sidenav) sidenav.classList.remove("show_side_nav");
    if (btn) {
      btn.classList.add("menu__small__btn");
      btn.classList.remove("menu__small__btn__cancel");
    }
    // Delegate smooth scroll to Header's handler
    if (onNavClick) onNavClick(e, href);
  };

  return (
    <aside aria-hidden="true" tabIndex="-1" className="menu__small_aside">
      <nav>
        <ol>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={activeHref === href ? "nav-active" : ""}
                onClick={(e) => handleClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ol>
        <ResumeBtn padding="18px 50px" />
      </nav>
    </aside>
  );
}

export default SideNav;
