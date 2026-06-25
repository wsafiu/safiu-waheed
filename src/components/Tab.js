function Tab({ experience, active, id, setActiveTab }) {
  return (
    <button
      data-target={id}
      tabIndex={0}
      role="tab"
      aria-selected={active}
      aria-controls={`panel-${id}`}
      id={`tab-${id}`}
      className={`tab_btn${active ? " active__tab" : ""}`}
      onClick={setActiveTab}
    >
      <span>{experience.tabTitle}</span>
    </button>
  );
}

export default Tab;
