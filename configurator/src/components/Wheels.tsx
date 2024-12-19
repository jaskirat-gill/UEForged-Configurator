import useMaterialProperties from "@/hooks/useMaterialProperties";
import useVehicleContext from "@/hooks/useVehicleContext";
import useVehicleScalingFactor from "@/hooks/useVehicleScalingFactor";
import { MASTER_DATA } from "@/lib/data";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { WheelTransformation } from "@/lib/types";
import { Box3, BoxHelper, Object3D, Vector3 } from "three";

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

//   const frontRimScale = useMemo(() => {
//     const desiredDiameterMeters =
//       (activeVehicle.rim_front_diameter) * 0.0254 + 0.03175;

//     return (
//       desiredDiameterMeters / MASTER_DATA.wheels.rims[activeVehicle.rim].od
//     );
//   }, [activeVehicle.rim_front_diameter, activeVehicle.rim]);

//   const rearRimScale = useMemo(() => {
//     const desiredDiameterMeters =
//       (activeVehicle.rim_rear_diameter) * 0.0254 + 0.03175;
//     return (
//       desiredDiameterMeters / MASTER_DATA.wheels.rims[activeVehicle.rim].od
//     );
//   }, [activeVehicle.rim_rear_diameter, activeVehicle.rim]);

//   const rimTransformations: WheelTransformation[] = useMemo(() => {
//     const rotation = Math.PI / 2;
//     const steering = (Math.PI * -currentVehicle.steering) / 180;
//     const scaledOffset = offset * vehicleScalingFactor;
//     const scaledFrontZ =
//       currentVehicle.model_orgin_to_front * vehicleScalingFactor;
//     const scaledRearZ =
//       currentVehicle.model_orgin_to_rear * vehicleScalingFactor;
//     return [
//       {
//         key: "FL",
//         position: [scaledOffset, 0, scaledFrontZ],
//         rotation: [0, Math.PI / 2 + steering, 0],
//         scale: [frontRimScale, frontRimScale, 1],
//       },
//       {
//         key: "FR",
//         position: [-scaledOffset, 0, scaledFrontZ],
//         rotation: [0, -rotation + steering, 0],
//         scale: [frontRimScale, frontRimScale, 1],
//       },
//       {
//         key: "RL",
//         position: [scaledOffset, 0, scaledRearZ * -1],
//         rotation: [0, rotation, 0],
//         scale: [rearRimScale, rearRimScale, frontRimScale],
//       },
//       {
//         key: "RR",
//         position: [-scaledOffset, 0, scaledRearZ * -1],
//         rotation: [0, -rotation, 0],
//         scale: [rearRimScale, rearRimScale, frontRimScale],
//       },
//     ];
//   }, [offset, activeVehicle]);

//   const addBoundingBox = (object: Object3D, key: string) => {
//     object.updateMatrixWorld(); // Ensure the object's world matrix is up to date
//     const box = new Box3().setFromObject(object);
//     const helper = new BoxHelper(object, 0xffff00);
//     object.add(helper);

//     const size = new Vector3();
//     box.getSize(size);
//     const sizeInInches = size.multiplyScalar(39.3701); // Convert meters to inches
//     const position = key.startsWith("F") ? "Front" : "Rear";
//     console.log(`${position} Bounding Box Dimensions - Width: ${sizeInInches.x.toFixed(2)} in, Height: ${sizeInInches.y.toFixed(2)} in, Depth: ${sizeInInches.z.toFixed(2)} in`);
//   };

  return (
    // <group name="wheels">
    //   {rimTransformations.map(({ key, position, rotation, scale }) => (
    //     <group key={key}>
    //       <primitive
    //         name="Rim"
    //         object={rimModel.scene.clone()}
    //         scale={scale}
    //         position={position}
    //         rotation={rotation}
    //         onUpdate={(object: Object3D) => addBoundingBox(object, key)}
    //       />
    //     </group>
    //   ))}
    // </group>
    <></>
  );
};

export default Wheels;
