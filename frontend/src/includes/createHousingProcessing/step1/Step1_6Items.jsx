import React from "react";

function Step1_6Items({
  text,
  count,
  onDecrementClick,
  onIncrementClick,
  className,
}) {
  return (
    <div>
      <div className="count-btn-items">
        {text} :{" "}
        <span>
          <button onClick={onDecrementClick} className={className}>
            -
          </button>
          <label>{count}</label>
          <button onClick={onIncrementClick} className={className}>
            +
          </button>
        </span>
      </div>
    </div>
  );
}

function Toggle({ text, checked, onChange }) {
  return (
    <div>
      <div className="switch-container">
        <p>{text} :</p>
        <label className="switch">
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}

function newToggle({ text, checked, onChange }) {
  return (
    <div>
      <div className="switch-container">
        <p>{text} :</p>
        <label className="switch">
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}

export { Step1_6Items, Toggle, newToggle };
