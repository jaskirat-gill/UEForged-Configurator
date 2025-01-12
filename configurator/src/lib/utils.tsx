import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Box3,
  BufferGeometry,
  Mesh,
  NormalBufferAttributes,
  Vector3,
} from "three";
import { MASTER_DATA } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBoundingBox(object: THREE.Object3D) {
  const box = new Box3().setFromObject(object);
  const size = new Vector3();
  box.getSize(size);
  return { box, size };
}

export const mmToMeters = (mm: number) => mm * 0.001;
export const inchToMeters = (inch: number) => inch * 0.0254;

// Calculate point on line (a to b, at length).
export const linePoint = (a: Vector3, b: Vector3, length: number): Vector3 => {
  const dir = b.clone().sub(a).normalize().multiplyScalar(length);
  return a.clone().add(dir);
};

// Helper function to scale tire geometry
export const scaleTireGeometry = (
  geometry: any,
  widthScale: number,
  rim_diameter: number,
  tire_diameter: number,
  label: string
) => {
  const tireOD = 0.5; // Since the geometry is normalized to 1m x 1m x 1m, the outer diameter is 0.5m
  const tireID = MASTER_DATA.wheels.tires[label].id
    ? MASTER_DATA.wheels.tires[label].id /
      MASTER_DATA.wheels.tires[label].od /
      2
    : 0;

  const newOd = tire_diameter / 2;
  const newId = rim_diameter / 2;

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
    const newRimDist = percentOut * (newOd - newId) + newId;
    const setVector = linePoint(centerVector, startVector, newRimDist);
    (positionArray as Float32Array)[i * 3] = setVector.x;
    (positionArray as Float32Array)[i * 3 + 1] = setVector.y;
  }

  return geometry;
};

export const normalizeGeometry = (
  mesh: Mesh
): BufferGeometry<NormalBufferAttributes> => {
  const geometry = mesh.geometry.clone();

  // Calculate the bounding box of the geometry to get its current dimensions.
  geometry.computeBoundingBox();
  const boundingBox = geometry.boundingBox;
  if (!boundingBox) {
    console.error("Bounding box not found.");
    return geometry;
  }
  const currentWidth = boundingBox.max.x - boundingBox.min.x;
  const currentHeight = boundingBox.max.y - boundingBox.min.y;
  const currentDepth = boundingBox.max.z - boundingBox.min.z;

  // Calculate scale factors to make the width and height 1.
  const frontWidthScale = 1 / currentWidth;
  const frontHeightScale = 1 / currentHeight;
  const frontDepthScale = 1 / currentDepth;

  geometry.scale(frontWidthScale, frontHeightScale, frontDepthScale);
  return geometry;
};
