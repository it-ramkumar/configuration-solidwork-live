import { useState, useEffect } from "react";
import { toggleModelSelection } from "../../customeHooks/toogleModelSelection";
import { isDependencyMet } from "../../customeHooks/isDependecyMet";
// const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import "./MultiStepForm.css";
import { StepDescriptions } from "../../customeHooks/stepDescription";
import { groupByGroup } from "../../customeHooks/groupByGroup";
import NextBackButton from "./MultiStepPaginationButtons";
import TabButtons from "./MultiStepTabButtons";
import ModelsCard from "./MultiStepCard";
import { goToNextStep } from "../../customeHooks/goToNextStep.js"
import { goToPrevStep } from "../../customeHooks/goToPrevStep.js"
import SummaryModal from "../summary-modal/SummaryModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterior } from "../../api/model/modelInterior.js";
import { fetchExterior } from "../../api/model/modelExterior.js";
import { fetchSystem } from "../../api/model/modelSystem.js";
import { componentsMap } from "../../ModelData";
import { handleGetQuote } from "../../customeHooks/handleQuote.js";
import { useNavigate } from "react-router-dom";


const MultiStepForm = ({
  addModelToScene,
  removeModelFromScene,
  getAddedQuantity,
  toggleExterior,
  sceneRef,
  cameraRef,
  modelRefs,
  orbitControlsRef


}) => {
  const dispatch = useDispatch()
  const router =useNavigate()
  const { interior, exterior, system } = useSelector((state) => state.models || []);
  const addedModels = useSelector((state) => state.addedModels.addedModels)

  const [activeTab, setActiveTab] = useState("interior");
  const [currentStep, setCurrentStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [summaryModal, setSummaryModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);

  function attachComponentsToMetadata(metadataArray, components) {
    return metadataArray?.map(item => ({
      ...item,
      component: components[item.componentKey] || null
    }));
  }
  const interiorWithComponents = attachComponentsToMetadata(interior?.data?.data, componentsMap);
  const exteriorWithComponents = attachComponentsToMetadata(exterior?.data?.data, componentsMap);
  const systemWithComponents = attachComponentsToMetadata(system?.data?.data, componentsMap);

  const interiorSteps = Object.entries(groupByGroup(interiorWithComponents))
  const exteriorSteps = Object.entries(groupByGroup(exteriorWithComponents))
  const systemSteps = Object.entries(groupByGroup(systemWithComponents))


  useEffect(() => {
    let action;

    if (activeTab === "interior") {
      action = fetchInterior();
    } else if (activeTab === "exterior") {
      action = fetchExterior();
    } else if (activeTab === "system") {
      action = fetchSystem();
    }

    if (action) {
      dispatch(action);
    }
  }, [activeTab, dispatch]);

  let steps;
  if (activeTab === "interior") {
    steps = interiorSteps;
  } else if (activeTab === "exterior") {
    steps = exteriorSteps;
  } else {
    steps = systemSteps;
  }







  const progressPercent = Math.round(((currentStep + 1) / steps.length) * 100);



  if (interiorSteps.length < 0 || !steps || steps.length === 0 || !steps[currentStep]) {
    return <div>Loading...</div>; // wait until data comes
  }
  return (

    <div className="main-content d-flex flex-column position-relative">
      <div className="canvas-wrapper" />

      <div className="tab-buttons-container">
        <TabButtons
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCurrentStep={setCurrentStep}
          toggleExterior={toggleExterior}
        />
      </div>

      <div className="progress-bar-bg">
        <div
          className="progress-bar-fg"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="section-header mb-2 px-3 pt-3">
        <h2 className="fs-5 fw-bold mb-1 section-title">
          {steps[currentStep][0].replace(/-/g, " ")}
        </h2>
        <p className="mb-3 section-desc">
          {StepDescriptions[steps[currentStep][0]]}
        </p>
      </div>

      <div className="card-list">
        <ModelsCard
          steps={steps}
          currentStep={currentStep}
          activeTab={activeTab}
          isDependencyMet={isDependencyMet}
          toggleModelSelection={toggleModelSelection}
          addModelToScene={addModelToScene}
          getAddedQuantity={getAddedQuantity}
          removeModelFromScene={removeModelFromScene}
          cameraRef={cameraRef}
          modelRefs={modelRefs}
          orbitControlsRef={orbitControlsRef}
        />
      </div>

      <div className="sticky-bottom-nav bg-white text-dark p-1 shadow-lg">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          {activeTab === "exterior" && currentStep === 0 ? (
            <NextBackButton
              onClick={() => {
                toggleExterior(false);
                setActiveTab("interior");
                setCurrentStep(0);
              }}
              text={"Interior"}
            />
          ) : activeTab === "system" && currentStep === 0 ? (
            <NextBackButton
              onClick={() => {
                toggleExterior(true);
                setActiveTab("exterior");
                setCurrentStep(0);
              }}
              text={"Exterior"}
            />
          ) : (
            <NextBackButton
              onClick={() => goToPrevStep(setCurrentStep, currentStep)}
              disabled={currentStep === 0}
              text={"Previous"}
            />
          )}

          {activeTab === "interior" && currentStep === steps.length - 1 ? (
            <NextBackButton
              onClick={() => {
                toggleExterior(true);
                setActiveTab("exterior");
                setCurrentStep(0);
              }}
              text={"Exterior"}
            />
          ) : activeTab === "exterior" && currentStep === steps.length - 1 ? (
            <NextBackButton
              onClick={() => {
                setActiveTab("system");
                setCurrentStep(0);
              }}
              text={"System"}
            />
          ) : currentStep === steps.length - 1 ? (
            <NextBackButton
              text={"Summary"}
              onClick={() => {
                setSummaryModal(true);
              }}
            />
          ) : (
            <NextBackButton
              onClick={() =>
                goToNextStep(setCurrentStep, currentStep, steps)
              }
              text={"Next"}
            />
          )}
        </div>

        <div className="text-center mt-3">
          <button
            className="btn btn-dark  shadow-sm btn-quote"
            onClick={() => handleGetQuote(sceneRef,
              setUploadProgress,
              setIsUploading,
              setUploadSuccess,
              setModelUrl,
              addedModels,
            router)}
          >
            Save & Get a Quote
          </button>
        </div>
      </div>

      {summaryModal && (
        <SummaryModal
          SummaryModal={summaryModal}
          setSummaryModal={setSummaryModal}
          sceneRef={sceneRef}
              setUploadProgress={setUploadProgress}
              setIsUploading={setIsUploading}
              setUploadSuccess={setUploadSuccess}
              setModelUrl={setModelUrl}
        />
      )}
    </div>
  );

};

export default MultiStepForm;