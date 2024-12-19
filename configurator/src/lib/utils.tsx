import { FC, memo } from "react";
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

  return <primitive object={scene} {...props} />;
});

export function getBoundingBox(object: THREE.Object3D) {
  const box = new Box3().setFromObject(object);
  const size = new Vector3();
  box.getSize(size);
  return { box, size };
}

export const mmToMeters = (mm: number) => mm * 0.001;
