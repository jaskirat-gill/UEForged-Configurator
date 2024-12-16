import { EditorData, VehicleConfigs } from "./types";

export const MASTER_DATA: VehicleConfigs = {
  defaults: {
    id: "mercedes_e63",
    lift: "0",
    color: "#B91818",
    rim: "hre_p200",
    finish: "High Gloss",
    rim_color: "gloss_black",
    rim_front_diameter: "19",
    rim_rear_diameter: "19",
    tire_front_width: "255",
    tire_rear_width: "275",
    tire_aspectRatio: "30",
  },
  vehicles: {
    mercedes_sls: {
      name: "Mercedes SLS",
      make: "Mercedes",
      model: "assets/models/vehicles/mercedes/sls/sls_painted.glb",
      wheel_offset: 0.8,
      wheelbase: 2.7776,
    },
    mercedes_e63: {
      name: "Mercedes E63",
      make: "Mercedes",
      model: "assets/models/vehicles/mercedes/e63.glb",
      wheel_offset: 0.791838,
      wheelbase: 2.9,
    },
    dodge_challenger: {
      name: "Dodge Challenger",
      make: "Dodge",
      model: "assets/models/vehicles/dodge/challenger.glb",
      wheel_offset: 0.8,
      wheelbase: 2.946,
    },
    ford_mustang: {
      name: "Ford Mustang",
      make: "Ford",
      model: "assets/models/vehicles/ford/mustang.glb",
      wheel_offset: 0.66,
      wheelbase: 2.366,
    },
  },
  wheels: {
    rims: {
      hre_p200: {
        make: "HRE",
        name: "P200",
        thumbnail: "/images/hre_p200.png",
        model: "assets/models/wheels/rims/p200.glb",
        width: 0.5,
        od: 1,
      },
      volks_te37: {
        make: "Volks",
        name: "TE37",
        thumbnail: "/images/volks_te37.jpg",
        model: "assets/models/wheels/rims/te37.glb",
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
  },
};

export const EDITOR_DATA: EditorData = {
  defaults: {
    paint_finish: "High Gloss",
    lift: 0,
    front_rim_diameter: 19,
    rear_rim_diameter: 20,
    front_tire_width: 255,
    rear_tire_width: 275,
    tire_aspectRatio: 30,
  },
  paint_finishes: ["Matte", "Semi Gloss", "High Gloss"],
  min_lift: -2,
  max_lift: 5,
  rim_colors: [
    {
      name: "Gloss Black",
      color: "#000000",
    },
    {
      name: "Matte Black",
      color: "#28282B",
    },
    {
      name: "Silver",
      color: "#C0C0C0",
    },
    {
      name: "Chrome",
      color: "#D8DBDE",
    },
    {
      name: "Body Match",
      color: "",
    },
  ],
  min_rim_diameter: 14,
  max_rim_diameter: 24,
  tire_widths: [205, 225, 245, 255, 275, 285, 295, 305, 315, 345],
  tire_aspectRatios: [20, 25, 30, 35, 40, 45, 50, 55, 60],
};
