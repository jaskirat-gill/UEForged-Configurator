import useMaterialProperties from "@/hooks/useMaterialProperties";
import useVehicleContext from "@/hooks/useVehicleContext";
import { MASTER_DATA } from "@/lib/data";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";

const Wheels = () => {
  const { activeVehicle } = useVehicleContext();
  const { setObjectMaterials } = useMaterialProperties();

  useEffect(() => {
    setObjectMaterials(
      rimModel.scene,
      activeVehicle.color,
      activeVehicle.finish,
      activeVehicle.rim_color
    );
  }, [
    activeVehicle.color,
    activeVehicle.finish,
    activeVehicle.rim_color,
    activeVehicle.id,
    setObjectMaterials,
  ]);

  const rimModel = useGLTF(MASTER_DATA.wheels.rims[activeVehicle.rim].model);

  // Retrieve the offset value
  const offset = useMemo(
    () => MASTER_DATA.vehicles[activeVehicle.id].wheel_offset,
    [activeVehicle.id]
  );

  const scalingFactor = useMemo(() => {
    const desiredDiameterMeters =
      parseFloat(activeVehicle.rim_rear_diameter) * 0.0254;
    const modelDiameterMeters =
      MASTER_DATA.wheels.rims[activeVehicle.rim].width;
    return desiredDiameterMeters / modelDiameterMeters;
  }, [activeVehicle.rim_rear_diameter, activeVehicle.rim]);

  const rimTransformations = useMemo(() => {
    const rotation = Math.PI / 2;
    const steering =
      (Math.PI * -MASTER_DATA.vehicles[activeVehicle.id].steering) / 180;
    return [
      {
        key: "FL",
        position: [
          offset,
          0,
          MASTER_DATA.vehicles[activeVehicle.id].model_orgin_to_front,
        ] as [number, number, number],
        rotation: [0, Math.PI / 2 + steering, 0] as [number, number, number],
      },
      {
        key: "FR",
        position: [
          -offset,
          0,
          MASTER_DATA.vehicles[activeVehicle.id].model_orgin_to_front,
        ] as [number, number, number],
        rotation: [0, -rotation + steering, 0] as [number, number, number],
      },
      {
        key: "RL",
        position: [
          offset,
          0,
          MASTER_DATA.vehicles[activeVehicle.id].model_orgin_to_rear * -1,
        ] as [number, number, number],
        rotation: [0, rotation, 0] as [number, number, number],
      },
      {
        key: "RR",
        position: [
          -offset,
          0,
          MASTER_DATA.vehicles[activeVehicle.id].model_orgin_to_rear * -1,
        ] as [number, number, number],
        rotation: [0, -rotation, 0] as [number, number, number],
      },
    ];
  }, [offset]);

  return (
    <group name="wheels">
      {rimTransformations.map(({ key, position, rotation }) => (
        <group key={key}>
          <primitive
            name="Rim"
            object={rimModel.scene.clone()}
            scale={[scalingFactor, scalingFactor, scalingFactor]}
            position={position}
            rotation={rotation}
          />
        </group>
      ))}
    </group>
  );
};

export default Wheels;
