import React, { useEffect,useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './MultiStepCard.css';




export default function ModelsCard({
  steps,
  currentStep,
  activeTab,
  isDependencyMet,
  toggleModelSelection,
  addModelToScene,
  getAddedQuantity,
  removeModelFromScene,
  cameraRef,
  modelRefs,
  orbitControlsRef

}) {
  const dispatch = useDispatch();
  const addedModels = useSelector((state) => state.addedModels.addedModels);
    const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentStep]);


  return (
    <div       ref={scrollRef}
 className="shadow p-3 main-content bg-white flex-grow-1 d-flex flex-column card-list">
      <div className="row">
        {steps[currentStep][1]
          .filter((model) => model.type !== "countertop")
          .map((model) => {

            const isDependencyOk = isDependencyMet(model, addedModels);
            const isDisabled = !isDependencyOk;

            const isSelected = addedModels.some(
              (m) => m.label === model.label && m.type === model.type
            );

            // Check if this is a 'counter-top' type model
            const isCounterTop = model.type === "counter-top";

            // ✅ Match only extensions linked by extensionKey
            const matchingExtensions = steps[currentStep][1].filter((ext) => {
              if (ext.type !== "countertop") return false;

              // ✅ check if model.label exists inside extensionKey array
              if (Array.isArray(ext.extensionKey)) {
                return ext.extensionKey.includes(model.label);
              }

              return ext.extensionKey === model.label;
            });

            return (
              <div key={model.label} className="col-12 mb-3">
                {/* Main Model Card */}
                <div
                  className={`bbv-parts clickable-card${isSelected ? " selected-card" : ""
                    } ${isDisabled ? "opacity-50 custom-cursor-not-allowed" : ""}
`}
                  onClick={() =>
                    !isDisabled
                      ? toggleModelSelection(
                        model,
                        addModelToScene,
                        getAddedQuantity,
                        removeModelFromScene,
                        dispatch,
                        addedModels,
                        cameraRef,
                        modelRefs,
                        orbitControlsRef
                      )
                      : undefined
                  }
                >
                  <img src={model.image} alt={model.label} className="card-img" />
                  <div className="card-content">
                    <h6 className="mb-1 fw-semibold card-label">{model.label}</h6>
                    {model.description && (
                      <p className="mb-0 card-desc">{model.description}</p>
                    )}
                  </div>
                </div>

                {/* Accordion: Extensions for selected Counter-Top */}
                {isSelected && isCounterTop && matchingExtensions.length > 0 && (
                  <div className="accordion mt-3">
                    <div className="accordion-header fw-bold mb-2">Extensions</div>
                    <div className="accordion-body">
                      {matchingExtensions.map((ext) => {
                        const isExtSelected = addedModels.some(
                          (m) => m.label === ext.label && m.type === ext.type
                        );
                        const isExtDisabled = !isDependencyMet(ext, addedModels);


                        return (
                          <div
                            key={ext.label}
                            className={`bbv-parts clickable-card mb-2 ${isExtSelected ? "selected-card" : ""
                              } ${isExtDisabled ? "opacity-50 custom-cursor-not-allowed" : ""}
`}
                            onClick={() =>
                              !isExtDisabled
                                ? toggleModelSelection(
                                  ext,
                                  addModelToScene,
                                  getAddedQuantity,
                                  removeModelFromScene,
                                  dispatch,
                                  addedModels,
                                  cameraRef,
                                  modelRefs,
                                  orbitControlsRef
                                )
                                : undefined
                            }
                          >
                            <img src={ext.image} alt={ext.label} className="card-img" />
                            <div className="card-content">
                              <h6 className="mb-1 fw-semibold card-label">{ext.label}</h6>
                              {ext.description && (
                                <p className="mb-0 card-desc">{ext.description}</p>
                              )}
                            </div>
                            {isExtSelected && (
                              <span className="badge bg-success added-badge">added</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

      </div>
    </div>


  );
}
