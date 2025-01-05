import useAnimateHeight from "@/hooks/useAnimateHeight";
import useMaterialProperties from "@/hooks/useMaterialProperties";
import useVehicleContext from "@/hooks/useVehicleContext";
import useVehicleScalingFactor from "@/hooks/useVehicleScalingFactor";
import { MASTER_DATA } from "@/lib/data";
import { FC, memo, useEffect, useRef } from "react";
import Model from "./Model";
import { Group } from "three";
interface BodyProps {
  height: number;
}

const Body: FC<BodyProps> = memo(({ height }) => {
  const vehicle = useRef<Group>(null);
  const { setObjectMaterials } = useMaterialProperties();
  const scalingFactor = useVehicleScalingFactor();
  const { activeVehicle } = useVehicleContext();

  // Set body and rim color
  useEffect(() => {
    if (vehicle.current) {
      setObjectMaterials(
        vehicle.current,
        activeVehicle.color,
        activeVehicle.finish,
        activeVehicle.rim_color
      );
    }
  }, [
    setObjectMaterials,
    activeVehicle.color,
    activeVehicle.finish,
    activeVehicle.rim_color,
  ]);

  useAnimateHeight(vehicle, height, height + 0.1);

  return (
    <group ref={vehicle} name="Body" key={activeVehicle.id}>
      <group scale={[scalingFactor, scalingFactor, scalingFactor]}>
        <Model path={MASTER_DATA.vehicles[activeVehicle.id].model} />
      </group>
    </group>
  );
});

export default Body;
