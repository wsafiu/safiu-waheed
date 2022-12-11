import parser from "html-react-parser";

function Content({ hidden, experience }) {
  const { title, companyName, date, roles, url } = experience;
  return (
    <div
      id="panel-0"
      role="tabpanel"
      tabindex="-1"
      aria-labelledby="tab-0"
      aria-hidden="true"
      className="tab_content"
      hidden={hidden}
    >
      <h3>
        <span>{title}</span>
        <span class="company">
          &nbsp;@&nbsp;
          <a
            href={url}
            class="inline-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            {companyName}
          </a>
        </span>
      </h3>
      <p class="range">{date}</p>
      <div>
        <ul>
          {roles.map((role) => (
            <li>{parser(role)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Content;
