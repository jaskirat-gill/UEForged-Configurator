import { FC, memo } from "react";
import { useGLTF } from "@react-three/drei";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Box3, Mesh, Vector3 } from "three";
import { MASTER_DATA } from "./data";

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

// Calculate point on line (a to b, at length).
export const linePoint = (a: Vector3, b: Vector3, length: number): Vector3 => {
  const dir = b.clone().sub(a).normalize().multiplyScalar(length);
  return a.clone().add(dir);
};

// Helper function to scale tire geometry
export const scaleTireGeometry = (
  tireGltf: any,
  widthScale: number,
  rim_diameter: number,
  tire_diameter: number,
  label: string
) => {
  const tireOD = MASTER_DATA.wheels.tires[label].od / 2;
  const tireID = MASTER_DATA.wheels.tires[label].id
    ? MASTER_DATA.wheels.tires[label].id / 2
    : 0;

  const newOd = (tire_diameter * 2.54) / 10 / 2;
  const newId = (rim_diameter * 2.54) / 10 / 2;

  // Create a copy of the original geometry.
  const mesh = tireGltf.scene.children[0] as Mesh;
  const geometry = mesh.geometry.clone();

  // Scale to match wheel width.
  geometry.scale(1, 1, widthScale);

  // Get position attributes.
  const positionAttribute = geometry.getAttribute("position");
  const positionArray = positionAttribute.array;

  // Loop through vertices to adjust the shape based on rim and tire diameters.
  for (let i = 0, l = positionAttribute.count; i < l; i++) {
    const startVector = new Vector3().fromBufferAttribute(positionAttribute, i);
    const centerVector = new Vector3(0, 0, startVector.z);
    const centerDist = centerVector.distanceTo(startVector);
    const rimDist = centerDist - tireID;
    const percentOut = rimDist / (tireOD - tireID);
    const newRimDist = (percentOut * (newOd - newId) + newId) / 10;
    const setVector = linePoint(centerVector, startVector, newRimDist);
    (positionArray as Float32Array)[i * 3] = setVector.x;
    (positionArray as Float32Array)[i * 3 + 1] = setVector.y;
  }

  return geometry;
};