import useMaterialProperties from "@/hooks/useMaterialProperties";
import useVehicleContext from "@/hooks/useVehicleContext";
import useVehicleScalingFactor from "@/hooks/useVehicleScalingFactor";
import { MASTER_DATA } from "@/lib/data";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { WheelTransformation } from "@/lib/types";

const Wheels = () => {
  const { activeVehicle } = useVehicleContext();
  const { setObjectMaterials } = useMaterialProperties();
  const vehicleScalingFactor = useVehicleScalingFactor();
  const currentVehicle = MASTER_DATA.vehicles[activeVehicle.id];
  const rimModel = useGLTF(MASTER_DATA.wheels.rims[activeVehicle.rim].model);

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

  // Retrieve the offset value
  const offset = useMemo(() => currentVehicle.wheel_offset, [activeVehicle.id]);

  const frontRimScale = useMemo(() => {
    const desiredDiameterMeters =
      parseFloat(activeVehicle.rim_front_diameter) * 0.0254 + 0.03175;

    return (
      desiredDiameterMeters / MASTER_DATA.wheels.rims[activeVehicle.rim].od
    );
  }, [activeVehicle.rim_front_diameter, activeVehicle.rim]);

  const rearRimScale = useMemo(() => {
    const desiredDiameterMeters =
      parseFloat(activeVehicle.rim_rear_diameter) * 0.0254 + 0.03175;
    return (
      desiredDiameterMeters / MASTER_DATA.wheels.rims[activeVehicle.rim].od
    );
  }, [activeVehicle.rim_rear_diameter, activeVehicle.rim]);

  const rimTransformations: WheelTransformation[] = useMemo(() => {
    const rotation = Math.PI / 2;
    const steering = (Math.PI * -currentVehicle.steering) / 180;
    const scaledOffset = offset * vehicleScalingFactor;
    const scaledFrontZ =
      currentVehicle.model_orgin_to_front * vehicleScalingFactor;
    const scaledRearZ =
      currentVehicle.model_orgin_to_rear * vehicleScalingFactor;
    return [
      {
        key: "FL",
        position: [scaledOffset, 0, scaledFrontZ],
        rotation: [0, Math.PI / 2 + steering, 0],
        scale: [frontRimScale, frontRimScale, 1],
      },
      {
        key: "FR",
        position: [-scaledOffset, 0, scaledFrontZ],
        rotation: [0, -rotation + steering, 0],
        scale: [frontRimScale, frontRimScale, 1],
      },
      {
        key: "RL",
        position: [scaledOffset, 0, scaledRearZ * -1],
        rotation: [0, rotation, 0],
        scale: [rearRimScale, rearRimScale, 1],
      },
      {
        key: "RR",
        position: [-scaledOffset, 0, scaledRearZ * -1],
        rotation: [0, -rotation, 0],
        scale: [rearRimScale, rearRimScale, 1],
      },
    ];
  }, [offset, activeVehicle]);

  return (
    <group name="wheels">
      {rimTransformations.map(({ key, position, rotation, scale }) => (
        <group key={key}>
          <primitive
            name="Rim"
            object={rimModel.scene.clone()}
            scale={scale}
            position={position}
            rotation={rotation}
          />
        </group>
      ))}
    </group>
  );
};

export default Wheels;
