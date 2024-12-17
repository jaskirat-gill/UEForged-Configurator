import useMaterialProperties from "@/hooks/useMaterialProperties";
import useVehicleContext from "@/hooks/useVehicleContext";
import { MASTER_DATA } from "@/lib/data";
import { useGLTF } from "@react-three/drei";
import { FC, memo, useEffect, useRef } from "react";
import { Group } from "three";

const Model: FC<{ path: string }> = memo(({ path, ...props }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} {...props} />;
});

const Vehicle = () => {
  const { activeVehicle } = useVehicleContext();
  const { setObjectMaterials } = useMaterialProperties();
  const vehicle = useRef<Group>(null);

  useEffect(() => {
    setObjectMaterials(vehicle.current, activeVehicle.color, activeVehicle.finish, activeVehicle.rim_color);
  }, [activeVehicle]);
  return (
    <group ref={vehicle} name="body">
      <Model path={MASTER_DATA.vehicles[activeVehicle.id].model} />
    </group>
  );
};

export default Vehicle;
