import { BufferGeometry, NormalBufferAttributes } from "three";

export interface IconProps {
  color?: string;
  size?: number;
}

export interface INavIcons {
  title: string;
  icon: React.FC<IconProps>;
  isActive: boolean;
}

export interface VehicleConfig {
  id: string;
  lift: number;
  color: string;
  finish: number;
  rim: string;
  rim_color: string;
  rim_front_diameter: number;
  rim_rear_diameter: number;
  tire_front_width: number;
  tire_rear_width: number;
  tire_aspectRatio: number;
  tire: string;
  cameraPosition: string;
}

export interface WheelConfig {
  make: string;
  name: string;
  model: string;
  width: number;
  thumbnail: string;
  od: number;
  id?: number;
}

export interface TireConfig {
  make: string;
  name: string;
  model: string;
  width: number;
  od: number;
  id: number;
}

export interface VehicleConfigs {
  defaults: VehicleConfig;
  vehicles: Record<string, VehicleData>;
  wheels: {
    rims: Record<string, WheelConfig>;
    tires: Record<string, TireConfig>;
  };
}

export interface VehicleData {
  name: string;
  make: string;
  model: string;
  wheel_offset: number;
  origin_to_front: number;
  origin_to_rear: number;
  actual_wheelbase: number;
  steering: number;
}

export interface EditorData {
  defaults: {
    paint_finish: string;
    lift: number;
    front_rim_diameter: number;
    rear_rim_diameter: number;
    front_tire_width: number;
    rear_tire_width: number;
    tire_aspectRatio: number;
  };
  paint_finishes: Array<{
    name: string;
    value: number;
  }>;
  min_lift: number;
  max_lift: number;
  rim_colors: Array<{
    name: string;
    color: string;
    label: string;
  }>;
  min_rim_diameter: number;
  max_rim_diameter: number;
  tire_widths: number[];
  tire_aspectRatios: number[];
}

export interface WheelTransformation {
  key: string;
  position: [number, number, number];
  rotation: [number, number, number];
  widthScale: number;
  odScale: number;
  tireGeometry: BufferGeometry<NormalBufferAttributes>;
}

export interface CameraPreset {
  [key:string]: [number, number, number];
}
