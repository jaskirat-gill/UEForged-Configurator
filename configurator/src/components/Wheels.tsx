import useMaterialProperties from "@/hooks/useMaterialProperties";
import useVehicleContext from "@/hooks/useVehicleContext";
import { MASTER_DATA } from "@/lib/data";
import { Model } from "@/lib/utils";
import { useEffect, useRef, useMemo, Suspense } from "react";
import { Group } from "three";



const Wheels = () => {
  const { activeVehicle } = useVehicleContext();
  const { setObjectMaterials } = useMaterialProperties();
  const vehicle = useRef<Group>(null);

  useEffect(() => {
    setObjectMaterials(vehicle.current, activeVehicle.color, activeVehicle.finish, activeVehicle.rim_color);
  }, [activeVehicle.color, activeVehicle.finish, activeVehicle.rim_color, activeVehicle.id, setObjectMaterials]);

  const modelPath = useMemo(() => MASTER_DATA.vehicles[activeVehicle.id].model, [activeVehicle.id]);

  return (
    <group ref={vehicle} name="body">
      <Suspense fallback={null}>
        <Model path={modelPath} />
      </Suspense>
    </group>
  );
};

export default Wheels;
