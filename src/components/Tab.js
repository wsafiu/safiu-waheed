function Tab({ experience, active, id, setActiveTab }) {
  console.log(id);
  return (
    <button
      data-target={id}
      tabindex="0"
      class={`tab_btn ${active ? "active__tab" : null} `}
      onClick={setActiveTab}
    >
      <span>{experience.tabTitle}</span>
    </button>
  );
}

export default Tab;
