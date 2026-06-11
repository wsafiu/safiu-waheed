function ResumeBtn({ padding = "0.75rem 1rem", title = "Resume" }) {
  const style = {
    color: "var(--green)",
    backgroundColor: "transparent",
    border: "1px solid var(--green)",
    borderRadius: "var(--border-radius)",
    padding: padding,
    fontFamily: "var(--font-mono)",
    lineHeight: 1,
    textDecoration: "none",
    cursor: "pointer",
    transition: "var(--transition)",
    // marginLeft: "15px",
    fontSize: "var(--fz-sm)",
    width: "max-content",
  };

  return (
    <div>
      <a
        className="resume-button"
        href="https://docs.google.com/document/d/e/2PACX-1vQvA3s7i3FKO9iQmHU0bdpqiTcMKHcpWw8Mkt64-mDU4kouDYrVTAcQxMXv-dq8PLg_aHViE0P1rCsY/pub"
        target="_blank"
        rel="noopener noreferrer"
        style={style}
      >
        {title}
      </a>
    </div>
  );
}

export default ResumeBtn;
