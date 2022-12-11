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
    marginLeft: "15px",
    fontSize: "var(--fz-sm)",
    width: "max-content",
  };

  return (
    <div>
      <a
        className="resume-button"
        href="https://drive.google.com/file/d/1jemQatMndXplBT7QSL0strUrGv232DhR/view?usp=drivesdk"
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
