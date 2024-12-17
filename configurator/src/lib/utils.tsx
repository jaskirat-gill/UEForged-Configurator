import { useGLTF } from "@react-three/drei";
import { clsx, type ClassValue } from "clsx";
import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Model: FC<{ path: string }> = memo(({ path, ...props }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} {...props} />;
});