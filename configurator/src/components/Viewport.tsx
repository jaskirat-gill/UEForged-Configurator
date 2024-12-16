import { memo, FC } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model: FC<{ path: string }> = memo(({ path, ...props }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} {...props} />;
});

const Viewport = () => {
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
        <Model path="/e63.glb" />
        <OrbitControls enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};

export default Viewport;
