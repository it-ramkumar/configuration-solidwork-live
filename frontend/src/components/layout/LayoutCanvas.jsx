// import{ Suspense, useEffect, useRef, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   OrbitControls,
//   Html,
//   Environment,
//   ContactShadows,
// } from "@react-three/drei";
// import { centerModelByBoundingBox } from "../../customeHooks/centerCanvas"
// import { VanModel } from "../../ModelData"
// import { useDispatch, useSelector } from "react-redux";
// import { setAddedModels } from "../../redux/slices/addedModels"
// import White_Van from "../van-model-components/VanModel"
// //import Heather_144_layoutt from  "../in-model-components/heather-144-layoutt"
// import { componentsMap } from "../../ModelData";
// import { fetchModelAll } from "../../api/model/modelAll";
// const LayoutCanvas = () => {
//   const [loader, setLoader] = useState(true);

//   const addedModels = useSelector((state) => state.addedModels.addedModels);
//   const selectModel = useSelector((state) => state.selectLayout.selectLayout);
//   const allModels = useSelector((state) => state.models.modelAll || []);
//   const groupRef = useRef()
//   const modelRefs = useRef({});
//   const dispatch = useDispatch();

//   // const filterMOdel = VanModel.filter((layout) => layout.layout === selectModel);


//   useEffect(() => {
//     centerModelByBoundingBox(groupRef)
//   }, [groupRef])

//   useEffect(() => {
//   const loadData = async () => {
//     setLoader(true);
//     try {
//       await dispatch(fetchModelAll()).unwrap();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   loadData();
// }, []);

// useEffect(() => {
//   if (!allModels?.data?.data || !selectModel) return;

//   const filterLayout = VanModel.filter(layout => layout.layout === selectModel);
//   if (!filterLayout?.[0]?.includes) return;
// // console.log(filterLayout,"filter va")
//   const allowedLabels = filterLayout[0].includes.map(item =>
//     item.trim().toLowerCase()
//   );
// // console.log(allowedLabels,"van me jo parts hongy wo ayengy")
//   let layoutPartsData = allModels.data.data.filter(model => {
//     const modelLabel = model?.label?.trim().toLowerCase();
//     return allowedLabels.includes(modelLabel);
//   });
// // console.log(layoutPartsData,"parts ajaingy jo b add hongy db sy ")
// const  layoutPartsAttachWithCom = layoutPartsData.map(model => ({
//     ...model,
//     component: componentsMap[model.componentKey] || null
//   }));
// // console.log(layoutPartsAttachWithCom,"parts k component collect karengy ")
//   dispatch(setAddedModels(layoutPartsAttachWithCom));
//   setLoader(false);
// }, [allModels, selectModel]);
// if (loader) {
//   return <div style={{ fontSize: "1.1rem", color: "#ccc" }}>
//     Loading Model...
//   </div>;
// }
//   return (
//     // <Canvas
//     //   className="cursor-grab active:cursor-grabbing"
//     //   camera={{ position: [0, 2, 10], fov: 35, near: 0.1, far: 1000 }}
//     //   style={{ width: "100%", height: "100%" }}
//     //   dpr={[1, 1.5]}
//     //   gl={{ alpha: true }}
//     //   shadows
//     // >
//     <Canvas
//   className="cursor-grab active:cursor-grabbing"
//   camera={{ position: [0, 2, 10], fov: 35, near: 0.1, far: 1000 }}
//   style={{ width: "100%", height: "100%", background: "#2F2F2F" }} // 👈 grey background
//   dpr={[1, 1.5]}
//   shadows
// >

//       {/* Lighting */}
//       <ambientLight intensity={0.6} />
//       {/* HDRI Background */}
//       <Environment preset="warehouse" />
//       <Suspense
//         fallback={
//           <Html center>
//             <div style={{ fontSize: "1.1rem", color: "#ccc" }}>
//               Loading Model...
//             </div>
//           </Html>
//         }
//       >
//         <group ref={groupRef} position={[0, -1.3, 0]}>
//           {addedModels.length > 0 ? (
//             <>
//               <White_Van />
//             {addedModels?.map((model) => {
//   const ModelComponent = model?.component;
//   const modelId = model?.id || `${model.label}-${model.type}-${model.group}`;

//   if (!ModelComponent) {
//     // console.error("Missing component for model:", model);
//     return null; // agar component nahi mila to render skip karo
//   }

//   return (
//     <group
//       key={modelId}
//       ref={(el) => {
//         if (el && model.id) {
//           modelRefs.current[model?.id] = el;
//         }
//       }}
//       position={model.position}
//     >
//       <ModelComponent
//         castShadow
//         receiveShadow
//         scale={model?.scale}
//         rotation={model?.rotation}
//       />
//     </group>
//   );
// })}

//             </>
//           ) :(
//             <Html center>
//         <div
//           style={{
//             backgroundColor: 'rgba(0, 0, 0, 0.8)',
//             color: 'white',
//             padding: '20px 30px',
//             borderRadius: '12px',
//             fontSize: '1.1rem',
//             fontWeight: '500',
//             textAlign: 'center',
//             maxWidth: '320px',
//             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
//           }}
//         >

//           No parts available for this van.<br />
//           Please go for layout 1.
//         </div>
//       </Html>
//     )}

//         </group>
//       </Suspense>


//       {/* Shadows */}
//       <ContactShadows
//         position={[0, -0.8, 0]}
//         opacity={0.35}
//         scale={10}
//         blur={1.5}
//         far={4}
//       />

//       {/* Orbit Controls with full camera control */}
//       <OrbitControls
//         enableZoom={true}
//         enablePan={false}
//         enableRotate={true}
//         rotateSpeed={0.7}
//         autoRotate={false}
//       />
//     </Canvas>
    
//   );
// };

// export default LayoutCanvas;

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { centerModelByBoundingBox } from "../../customeHooks/centerCanvas";
import { VanModel, componentsMap } from "../../ModelData";
import { useDispatch, useSelector } from "react-redux";
import { setAddedModels } from "../../redux/slices/addedModels";
import White_Van from "../van-model-components/VanModel";
import { fetchModelAll } from "../../api/model/modelAll";
import { useNavigate } from "react-router-dom";
import SummaryModal from "../summary-modal/SummaryModal";

const LayoutCanvas = () => {
  const [loader, setLoader] = useState(true);

  const addedModels = useSelector((state) => state.addedModels.addedModels);
  const selectModel = useSelector((state) => state.selectLayout.selectLayout);
  const allModels = useSelector((state) => state.models.modelAll || []);

  // ✅ Correct way to define the ref
  const groupRef = useRef();
  const modelRefs = useRef({});
  const dispatch = useDispatch();
  const router = useNavigate();

  // Upload state
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);

  // Modal state
  const [summaryModal, setSummaryModal] = useState(false);

  useEffect(() => {
    centerModelByBoundingBox(groupRef);
  }, [groupRef]);

  useEffect(() => {
    const loadData = async () => {
      setLoader(true);
      try {
        await dispatch(fetchModelAll()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!allModels?.data?.data || !selectModel) return;

    const filterLayout = VanModel.filter(
      (layout) => layout.layout === selectModel
    );
    if (!filterLayout?.[0]?.includes) return;

    const allowedLabels = filterLayout[0].includes.map((item) =>
      item.trim().toLowerCase()


  );

    let layoutPartsData = allModels.data.data.filter((model) => {
      const modelLabel = model?.label?.trim().toLowerCase();
      return allowedLabels.includes(modelLabel);
    });

    const layoutPartsAttachWithCom = layoutPartsData.map((model) => ({
      ...model,
      component: componentsMap[model.componentKey] || null,
    }));

    dispatch(setAddedModels(layoutPartsAttachWithCom));
    setLoader(false);
  }, [allModels, selectModel]);

  if (loader) {
    return (
      <div style={{ fontSize: "1.1rem", color: "#ccc" }}>Loading Model...</div>
    );
  }

  return (
    <div className="layout-canvas-page">
      <Canvas
        className="cursor-grab active:cursor-grabbing"
        camera={{ position: [0, 2, 10], fov: 35, near: 0.1, far: 1000 }}
        style={{ width: "100%", height: "100vh", background: "#2F2F2F" }}
        dpr={[1, 1.5]}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <Environment preset="warehouse" />

        <Suspense
          fallback={
            <Html center>
              <div style={{ fontSize: "1.1rem", color: "#ccc" }}>
                Loading Model...
              </div>
            </Html>
          }
        >
          <group ref={groupRef} position={[0, -1.3, 0]}>
            {addedModels.length > 0 ? (
              <>
                <White_Van />
                {addedModels?.map((model) => {
                  const ModelComponent = model?.component;
                  const modelId =
                    model?.id || `${model.label}-${model.type}-${model.group}`;

                  if (!ModelComponent) return null;

                  return (
                    <group
                      key={modelId}
                      ref={(el) => {
                        if (el && model.id) {
                          modelRefs.current[model?.id] = el;
                        }
                      }}
                      position={model.position}
                    >
                      <ModelComponent
                        castShadow
                        receiveShadow
                        scale={model?.scale}
                        rotation={model?.rotation}
                      />
                    </group>
                  );
                })}
              </>
            ) : (
              <Html center>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: "white",
                    padding: "20px 30px",
                    borderRadius: "12px",
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    textAlign: "center",
                    maxWidth: "320px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  No parts available for this van.
                  <br />
                  Please go for layout 1.
                </div>
              </Html>
            )}
          </group>
        </Suspense>

        {/* Shadows */}
        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.35}
          scale={10}
          blur={1.5}
          far={4}
        />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          rotateSpeed={0.7}
          autoRotate={false}
        />
      </Canvas>

      <div
  style={{
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  }}
>
  <button
    className="btn btn-dark shadow-sm btn-quote"
    onClick={() => setSummaryModal(true)} // 👈 open modal instead
    disabled={isUploading}
    style={{ padding: "10px 25px", borderRadius: "12px" }}
  >
    Order Now
  </button>
</div>

      {/* User Info Form Modal */}
      {summaryModal && (
        <SummaryModal
          SummaryModal={summaryModal}
          setSummaryModal={setSummaryModal}
          sceneRef={groupRef}
          setUploadProgress={setUploadProgress}
          setIsUploading={setIsUploading}
          setUploadSuccess={setUploadSuccess}
          setModelUrl={setModelUrl}
        />
      )}
    </div>
  );
};

export default LayoutCanvas;
