import "../css/aside.css";

function Aside({ children, orientation }) {
  return (
    <div
      className={`side__element ${orientation === "right" ? "right" : "left"}`}
    >
      {children}
    </div>
  );
}

export default Aside;
