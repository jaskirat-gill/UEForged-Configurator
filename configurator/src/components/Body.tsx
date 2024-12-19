import useAnimateHeight from "@/hooks/useAnimateHeight";
import useMaterialProperties from "@/hooks/useMaterialProperties";
import useVehicleScalingFactor from "@/hooks/useVehicleScalingFactor";
import { MASTER_DATA } from "@/lib/data";
import { Model } from "@/lib/utils";
import { FC, memo, useEffect, useRef } from "react";
import { Group } from "three";

interface BodyProps {
  id: string;
  height: number;
  color: string;
  finish: number;
}

const Body: FC<BodyProps> = memo(({ id, height, color, finish }) => {
  const vehicle = useRef<Group>(null);
  const { setObjectMaterials } = useMaterialProperties();

  // Set body color.
  useEffect(() => {
    if (vehicle.current) {
      setObjectMaterials(vehicle.current, color, finish);
    }
  }, [setObjectMaterials, color, finish]);

  useAnimateHeight(vehicle, height, height + 0.1);

  return (
    <group ref={vehicle} name="Body" key={id}>
      <Model path={MASTER_DATA.vehicles[id].model} />
    </group>
  );
});

export default Body;
