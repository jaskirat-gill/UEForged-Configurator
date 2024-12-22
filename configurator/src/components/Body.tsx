import useAnimateHeight from "@/hooks/useAnimateHeight";
import useMaterialProperties from "@/hooks/useMaterialProperties";
import useVehicleScalingFactor from "@/hooks/useVehicleScalingFactor";
import { MASTER_DATA } from "@/lib/data";
import { Model } from "@/lib/utils";
import { useGLTF } from "@react-three/drei";
import { FC, memo, useEffect, useMemo, useRef } from "react";
import { Group } from "three";
import * as THREE from "three";
interface BodyProps {
  id: string;
  height: number;
  color: string;
  finish: number;
}

const Body: FC<BodyProps> = memo(({ id, height, color, finish }) => {
  const vehicle = useRef<Group>(null);
  const { setObjectMaterials } = useMaterialProperties();
  const scalingFactor = useVehicleScalingFactor();

  // Set body color and scaling factor.
  useEffect(() => {
    if (vehicle.current) {
      setObjectMaterials(vehicle.current, color, finish);
    }
  }, [setObjectMaterials, color, finish]);

  useAnimateHeight(vehicle, height, height + 0.1);

  return (
    <group ref={vehicle} name="Body" key={id}>
      <group scale={[scalingFactor, scalingFactor, scalingFactor]}>
        <Model path={MASTER_DATA.vehicles[id].model} />
      </group>
    </group>
  );
});

export default Body;
