import { FC, memo, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Box3, Vector3 } from "three";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ModelProps extends React.ComponentPropsWithoutRef<"primitive"> {
  path: string;
}

export const Model: FC<ModelProps> = memo(({ path, ...props }) => {
  const { scene } = useGLTF(path);

  useEffect(() => {
    // Compute the bounding box after the model is loaded
    const box = new Box3().setFromObject(scene);
    const size = new Vector3();
    box.getSize(size);
    console.log(`Model size for ${path}:`, size);
  }, [scene, path]);

  return <primitive object={scene} {...props} />;
});

export const mmToMeters = (mm: number) => mm * 0.001;



