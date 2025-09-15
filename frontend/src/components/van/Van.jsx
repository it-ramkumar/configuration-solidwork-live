import {
  useEffect,
  Suspense,
  useState,
  useRef,
} from "react";

import {
  Environment,

  Preload,
} from "@react-three/drei";

import {
  addModelToScene,
} from "../../customeHooks/addSceneToModel"
import {
  getAddedQuantity,
} from "../../customeHooks/addQuantityToModel"
import {
  removeModelFromScene,
} from "../../customeHooks/removeModelFromScene"
import MultiStepForm from "../multi-step-form/MultiStepForm"
import Van_White from "../van-model-components/VanModel"
import { ModelPreloader } from "../model-preloader/ModelPreloader";
import { Canvas } from "@react-three/fiber";
import GIFVanLoader from "../gif-van-loader/GifVanLoader";
import { centerModelByBoundingBox } from "../../customeHooks/centerCanvas";
import InteriorCameraControls from "./VanInteriorCameraControls";
import ExteriorCameraControls from "./VanExteriorCameraControl";
import SpotLightCom from "./VanSpotsLight";
import InteriorDirectionButton from "../buttons/InteriorDirectionButton";
import { interiorDirectionBack } from "../../customeHooks/interiorDirectionBack";
import { interiorDirectionNext } from "../../customeHooks/interiorDirectionNext";
import NextBackButton from "../multi-step-form/MultiStepPaginationButtons";
import CameraAssigner from "../camara-assigner/CameraAssigner";
import ExportableScene from "../exportable-scene/ExportableScene";
import { useDispatch, useSelector } from "react-redux";
import {useLeavePageConfirm} from "../../customeHooks/useLeavePageConfirm";
import "./Van.css";
import AnimatedHandButton from "../animated-hand-button/AnimatedHandButton";


function Van() {
  const dispatch = useDispatch();
  const vanName = useSelector((state) => state.vanName.vanName)
  const addedModels = useSelector((state) => state.addedModels.addedModels);
  const [activeModelId, setActiveModelId] = useState(null);
  const [sceneToExport, setSceneToExport] = useState(null);
  const [showExterior, setShowExterior] = useState(false);


  const orbitControlsRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const modelRefs = useRef({});
  const groupRef = useRef();
  const [isIntView, setisIntView] = useState(false);
  const canvasContainerRef = useRef()
  const [targetPos, setTargetPos] = useState([0, 0, 0]); // Start inside van
  const CAMERA_OFFSET = 0.2;

  const camPros = [
    targetPos[0],
    targetPos[1],
    targetPos[2] + CAMERA_OFFSET,
  ];

  useEffect(() => {
    return () => {
      sceneToExport?.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry.dispose();
          obj.material.dispose();
        }
      });
    };
  }, [sceneToExport]);

  useEffect(() => {
    centerModelByBoundingBox(groupRef)
  }, [groupRef]);

  useEffect(() => {
    setTargetPos([0, 0, 0])
  }, [isIntView])

    useEffect(() => {
  window.scrollTo(0, 0);
}, []);
 useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);
  ModelPreloader(vanName)
  useLeavePageConfirm("Are you sure you want to leave? Your changes will be lost.");
  return (
   <div className="container-fluid">
      <div className="row d-flex">

        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 d-flex justify-content-center">

          <Suspense fallback={<GIFVanLoader />}>
            <div className="canvas-container" ref={canvasContainerRef} style={{ position: 'relative' }}>
              <Canvas
                gl={{ preserveDrawingBuffer: true }}
                shadows={{ type: "PCFSoftShadowMap" }}
                dpr={[1, 1.2]}
                frameloop="demand"
              >

                <CameraAssigner cameraRef={cameraRef} />
                {isIntView ? (
                  <>
                    <SpotLightCom position={[0.6, -0.1, 1.1]} />
                    <SpotLightCom position={[0, -0.1, 1.1]} />
                    <SpotLightCom position={[-0.6, 0.3, 1.1]} />
                  </>
                ) : (
                  <>
                    <ambientLight intensity={0.25} />
                  </>
                )}
                <Suspense fallback={null}>
                  <Environment
                    files="./textures/zwartkops_straight_afternoon_1k.hdr"
                    background={false}
                    environmentIntensity={1.2}
                  />
                </Suspense>
                <Preload all />
                <group ref={groupRef} position={isIntView ? [0, -1.7, 0] : [0, -1.3, 0]}>
                  <Van_White showExterior={showExterior} />
               {addedModels.map((model) => {
  const ModelComponent = model?.component;
  const modelId = model.id || `${model.label}-${model.type}-${model.group}`;

  if (!ModelComponent) {
    // console.error("Missing component for model:", model);
    return null; // agar component exist nahi karta to skip kar do
  }

  return (
    <group
      key={modelId}
      ref={(el) => {
        if (el && model.id) {
          modelRefs.current[model.id] = el;
        }
      }}
      position={model.position}
    >
      <ModelComponent
        castShadow
        receiveShadow
        scale={model.scale}
        rotation={model.rotation}
        onClick={() => setActiveModelId(model.id)}
      />
    </group>
  );
})}

                </group>
                {isIntView ?
                  <InteriorCameraControls camPros={camPros} targetPos={targetPos} />
                  :
                  (<ExteriorCameraControls  cameraRef={cameraRef} orbitControlsRef={orbitControlsRef} />)

                }
                <ExportableScene
                  ref={sceneRef}
                  exportSceneCallback={setSceneToExport}
                />
              </Canvas>
            </div>
          </Suspense>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center align-items-center">
          <MultiStepForm
            // isSelected={isSelected}
            addModelToScene={(m) =>
              addModelToScene(m, addedModels, dispatch, setActiveModelId, modelRefs, cameraRef, orbitControlsRef,)
            }
            removeModelFromScene={(label) =>
              removeModelFromScene(label, dispatch, addedModels)
            }
            getAddedQuantity={(label) => getAddedQuantity(label, addedModels)}
            showExterior={showExterior}
            toggleExterior={setShowExterior}
            sceneRef={sceneRef}
            cameraRef={cameraRef}
            modelRefs={modelRefs}
            orbitControlsRef={orbitControlsRef}
          />
        </div>
      </div>
      <div className="interior-toggle-btn-wrapper">
<div className="d-flex gap-3 align-items-center justify-content-center position-relative">
  <div className="animated-hand-position">
    <AnimatedHandButton />
  </div>
  <NextBackButton
    onClick={() => setisIntView(!isIntView)}
    text={isIntView ? "Exit Interior" : "Interior View"}
  />
</div>

  {isIntView && (
    <div
      className="d-flex flex-column gap-3"
      style={{
        position: "absolute",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
    >
      <InteriorDirectionButton onClick={() => interiorDirectionBack(camPros, setTargetPos)} label="▲" />
      <InteriorDirectionButton onClick={() => interiorDirectionNext(camPros, setTargetPos)} label="▼" />
    </div>

        )}

      </div>
    </div>
  );
}

export default Van;
