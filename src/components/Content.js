import parser from "html-react-parser";

/**
 * Content panel for the Experience section.
 *
 * Visibility is controlled entirely by GSAP (the parent .tab__contents-track
 * translates up/down to reveal the active panel).  The `active` prop is used
 * only for ARIA/accessibility attributes so assistive tech knows which panel
 * is currently presented.
 */
function Content({ active, experience, id }) {
  const { title, companyName, type, date, roles, url } = experience;

  return (
    <div
      id={`panel-${id}`}
      role="tabpanel"
      tabIndex={active ? 0 : -1}
      aria-labelledby={`tab-${id}`}
      aria-hidden={!active}
      className="tab_content"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="tab_content__header">
        <h3 className="tab_content__title">
          {title}
          {url ? (
            <span className="company">
              &nbsp;@&nbsp;
              <a
                href={url}
                className="inline-link"
                rel="noopener noreferrer"
                target="_blank"
              >
                {companyName}
              </a>
            </span>
          ) : (
            <span className="company">&nbsp;@ {companyName}</span>
          )}
        </h3>

        <div className="tab_content__meta">
          {type && <span className="tab_content__badge">{type}</span>}
          <p className="tab_content__date">{date}</p>
        </div>
      </div>

      {/* ── Role bullets ───────────────────────────────────── */}
      <ul className="tab_content__roles">
        {roles.map((role, i) => (
          <li key={i}>{parser(role)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Content;
