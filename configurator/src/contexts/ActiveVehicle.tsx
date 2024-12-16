import { createContext, useState, ReactNode, useEffect } from "react";
import { VehicleConfigs } from "../lib/types";
import { MASTER_DATA } from "../lib/data";

interface VehicleContextProps {
  activeVehicle: VehicleConfigs["defaults"];
  updateActiveVehicle: (updates: Partial<VehicleConfigs["defaults"]>) => void;
}

const VehicleContext = createContext<VehicleContextProps | undefined>(
  undefined
);

const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [activeVehicle, setActiveVehicle] = useState(MASTER_DATA.defaults);

  const updateActiveVehicle = (
    updates: Partial<VehicleConfigs["defaults"]>
  ) => {
    setActiveVehicle((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    console.log("Active Vehicle updated:", activeVehicle);
  }, [activeVehicle]);

  return (
    <VehicleContext.Provider value={{ activeVehicle, updateActiveVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};

export { VehicleContext, VehicleProvider };
