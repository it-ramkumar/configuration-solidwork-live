import { useImperativeHandle } from "react";
import { useEffect,forwardRef, } from "react";
import { useThree } from "@react-three/fiber";
import PropTypes from "prop-types";

const ExportableScene = forwardRef(({ exportSceneCallback }, ref) => {
  const { scene } = useThree();

  useEffect(() => {
    exportSceneCallback(scene);
  }, [scene]);

  useImperativeHandle(ref, () => ({
    getScene: () => scene,
  }));

  return null;
});

ExportableScene.displayName = "ExportableScene";
ExportableScene.propTypes = {
  exportSceneCallback: PropTypes.func.isRequired,
};
export default ExportableScene