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
  lift: string;
  color: string;
  finish: number;
  rim: string;
  rim_color: string;
  rim_front_diameter: string;
  rim_rear_diameter: string;
  tire_front_width: string;
  tire_rear_width: string;
  tire_aspectRatio: string;
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

export interface VehicleConfigs {
  defaults: VehicleConfig;
  vehicles: Record<string, VehicleData>;
  wheels: {
    rims: Record<string, WheelConfig>;
  };
}

export interface VehicleData {
  name: string;
  make: string;
  model: string;
  wheel_offset: number;
  model_orgin_to_front: number;
  model_orgin_to_rear: number;
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
  }>;
  min_rim_diameter: number;
  max_rim_diameter: number;
  tire_widths: number[];
  tire_aspectRatios: number[];
}
