import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DefaultLoadingManager } from "three";

import Vehicle from "./Vehicle";

const ViewPort = () => {
  const [isLoaded, setIsLoaded] = useState(false);
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
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas camera={{ position: [0, 2, 5] }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={1} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <spotLight
          position={[-10, 10, -10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Vehicle />
        <OrbitControls enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};

export default ViewPort;
