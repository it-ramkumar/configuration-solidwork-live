import React, { useState } from "react";

export default function TabButtons({
  activeTab,
  setActiveTab,
  setCurrentStep,
  toggleExterior,
}) {
  const [tabs, setTabs] = useState(
    [
      { key: "interior", label: "Interior", icon: "bi-house-door" },
      { key: "exterior", label: "Exterior", icon: "bi-box" },
      { key: "system", label: "System", icon: "bi-gear" },
    ]
  )

  return (
    <div
      className="d-flex justify-content-center gap-2 pt-2 pb-2 bg-body-secondary shadow-sm sticky-top"
      style={{ zIndex: 2 }}
    >
      {tabs.map((t) => (
        <button
          key={t.key}
          className={`btn px-3 py-2 fw-semibold shadow-sm position-relative tab-btn${activeTab === t.key ? " active" : ""
            }`}
          aria-current={activeTab === t.key}
          onClick={() => {
            setActiveTab(t.key);
            setCurrentStep(0);
            if (t.key === "interior") toggleExterior(false);
            if (t.key === "exterior") toggleExterior(true);
          }}
        >
          {t.label}
          {activeTab === t.key && (
            <span
              className="position-absolute top-0 start-100 translate-middle rounded-pill selected-indicator"
              aria-label="Selected"
            >
              <span className="visually-hidden">selected</span>
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
