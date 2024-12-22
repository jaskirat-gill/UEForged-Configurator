import { EditorData, VehicleConfigs } from "./types";

export const MASTER_DATA: VehicleConfigs = {
  defaults: {
    id: "bmw_m4",
    lift: 0,
    color: "#B91818",
    rim: "hre_p200",
    finish: 0,
    rim_color: "gloss_black",
    rim_front_diameter: 19,
    rim_rear_diameter: 20,
    tire_front_width: 255,
    tire_rear_width: 275,
    tire_aspectRatio: 30,
    tire: "michelin_pilot_sport_4",
  },
  vehicles: {
    bmw_m4: {
      name: "BMW M4",
      make: "BMW",
      model: "/bmw_m4.glb",
      wheel_offset: 0.61,
      origin_to_front: 1.13791,
      origin_to_rear: 0.968938,
      actual_wheelbase: 2.857,
      steering: -10,
    },
  },
  wheels: {
    rims: {
      hre_p200: {
        make: "HRE",
        name: "P200",
        thumbnail: "/images/hre_p200.png",
        model: "/p200.glb",
        width: 0.56,
        od: 1,
      },
      volks_te37: {
        make: "Volks",
        name: "TE37",
        thumbnail: "/images/volks_te37.jpg",
        model: "/te37.glb",
        width: 3.13868,
        od: 6.28967,
      },
      hre_hc1: {
        make: "Vossen",
        name: "HC-1",
        thumbnail: "/images/hre_hc1.jpg",
        model: "assets/models/wheels/rims/hc1.glb",
        width: 6.5834,
        od: 14.0995,
      },
      forgiato_multato: {
        make: "Forgiato",
        name: "Multato",
        thumbnail: "/images/forgiato_multato.png",
        model: "assets/models/wheels/rims/multalto.glb",
        width: 0.125,
        od: 0.252,
      },
      vossen_vfs1: {
        make: "Vossen",
        name: "VFS1",
        thumbnail: "/images/vossen_vfs1.png",
        model: "assets/models/wheels/rims/vfs1.glb",
        width: 33.3934,
        od: 69.7145,
      },
    },
    tires: {
      michelin_pilot_sport_4: {
        make: "Michelin",
        name: "Michelin",
        model: "/michelin.glb",
        width: 0.26,
        od: 0.54,
        id: 0.42,
      },
    },
  },
};

export const EDITOR_DATA: EditorData = {
  defaults: {
    paint_finish: "Gloss",
    lift: 0,
    front_rim_diameter: 19,
    rear_rim_diameter: 20,
    front_tire_width: 255,
    rear_tire_width: 275,
    tire_aspectRatio: 30,
  },
  paint_finishes: [
    { name: "Gloss", value: 0 },
    { name: "Satin", value: 0.2 },
    { name: "Matte", value: 0.6 },
  ],
  min_lift: -2,
  max_lift: 5,
  rim_colors: [
    {
      name: "Gloss Black",
      color: "#000000",
      label: "gloss_black",
    },
    {
      name: "Matte Black",
      color: "#28282B",
      label: "flat_black",
    },
    {
      name: "Silver",
      color: "#C0C0C0",
      label: "silver",
    },
    {
      name: "Chrome",
      color: "#D8DBDE",
      label: "chrome",
    },
    {
      name: "Body Match",
      color: "",
      label: "body",
    },
  ],
  min_rim_diameter: 14,
  max_rim_diameter: 24,
  tire_widths: [205, 225, 245, 255, 275, 285, 295, 305, 315, 345],
  tire_aspectRatios: [20, 25, 30, 35, 40, 45, 50, 55, 60],
};
