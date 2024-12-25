import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { DefaultLoadingManager } from "three";
import {
  Environment,
  Lightformer,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import Vehicle from "./Vehicle";
import { cameraPresets } from "@/lib/data";
import useVehicleContext from "@/hooks/useVehicleContext";

interface IViewPortProps {
  setIsLoaded: (isLoaded: boolean) => void;
}
const ViewPort = ({ setIsLoaded }: IViewPortProps) => {
  const { activeVehicle } = useVehicleContext();
  // Set loaded state based on default loading manager.
  useEffect(() => {
    const loadingManager = DefaultLoadingManager;
    loadingManager.onStart = () => {
      setIsLoaded(false);
    };
    loadingManager.onLoad = () => {
      setIsLoaded(true);
    };

    return () => {
      loadingManager.onStart = undefined;
      loadingManager.onLoad = () => {};
    };
  }, [activeVehicle.cameraPosition]);

  return (
    <Canvas
      gl={{ logarithmicDepthBuffer: true, antialias: false }}
      dpr={[1, 1.5]}
      camera={{
        position: cameraPresets[activeVehicle.cameraPosition],
        fov: 25,
      }}
    >
      <color attach="background" args={["#15151a"]} />
      <Vehicle />
      <hemisphereLight intensity={0.5} />
      <ContactShadows
        resolution={1024}
        frames={1}
        position={[0, -0.21, 0]}
        scale={15}
        blur={0.5}
        opacity={1}
        far={20}
      />
      <mesh
        scale={4}
        position={[3, -0.2, -1.5]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
      >
        <ringGeometry args={[0.9, 1, 4, 1]} />
        <meshStandardMaterial color="white" roughness={0.75} />
      </mesh>
      <mesh
        scale={4}
        position={[-3, -0.2, -1]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
      >
        <ringGeometry args={[0.9, 1, 3, 1]} />
        <meshStandardMaterial color="white" roughness={0.75} />
      </mesh>
      {/* We're building a cube-mapped environment declaratively.
            Anything you put in here will be filmed (once) by a cubemap-camera
            and applied to the scenes environment, and optionally background. */}
      <Environment resolution={512}>
        {/* Ceiling */}
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -9]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 0]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 9]}
          scale={[10, 1, 1]}
        />
        {/* Sides */}
        <Lightformer
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-50, 2, 0]}
          scale={[100, 2, 1]}
        />
      </Environment>
      <OrbitControls />
    </Canvas>
  );
};

export default ViewPort;
