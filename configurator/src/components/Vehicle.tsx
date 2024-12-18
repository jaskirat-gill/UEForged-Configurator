import useMaterialProperties from "@/hooks/useMaterialProperties";
import useVehicleContext from "@/hooks/useVehicleContext";
import { MASTER_DATA } from "@/lib/data";
import { Model } from "@/lib/utils";
import { useEffect, useRef, useMemo, Suspense } from "react";
import { Group } from "three";

const Vehicle = () => {
  const { activeVehicle } = useVehicleContext();
  const { setObjectMaterials } = useMaterialProperties();
  const vehicle = useRef<Group>(null);

  useEffect(() => {
    setObjectMaterials(vehicle.current, activeVehicle.color, activeVehicle.finish, activeVehicle.rim_color);
  }, [activeVehicle.color, activeVehicle.finish, activeVehicle.rim_color, activeVehicle.id, setObjectMaterials]);

  const scalingFactor = useMemo(() => {
    const desiredWheelbase =
      (MASTER_DATA.vehicles[activeVehicle.id].actual_wheelbase);
    const modelWheelbase =
      MASTER_DATA.vehicles[activeVehicle.id].model_orgin_to_front + MASTER_DATA.vehicles[activeVehicle.id].model_orgin_to_rear;
    return desiredWheelbase / modelWheelbase;
  }, [activeVehicle.id]);

  const modelPath = useMemo(() => MASTER_DATA.vehicles[activeVehicle.id].model, [activeVehicle.id]);

  return (
    <group ref={vehicle} name="body">
      <Suspense fallback={null}>
        <Model path={modelPath} />
      </Suspense>
    </group>
  );
};

export default Vehicle;
