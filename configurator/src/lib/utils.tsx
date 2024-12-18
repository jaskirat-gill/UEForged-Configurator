import { FC, memo } from "react";
import { useGLTF } from "@react-three/drei";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ModelProps extends React.ComponentPropsWithoutRef<'primitive'> {
  path: string;
}

export const Model: FC<ModelProps> = memo(({ path, ...props }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} {...props} />;
});