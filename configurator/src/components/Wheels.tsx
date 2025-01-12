import useVehicleContext from "@/hooks/useVehicleContext";
import useVehicleScalingFactor from "@/hooks/useVehicleScalingFactor";
import { MASTER_DATA } from "@/lib/data";
import { WheelTransformation } from "@/lib/types";
import {
  inchToMeters,
  mmToMeters,
  normalizeGeometry,
  scaleTireGeometry,
} from "@/lib/utils";
import { useGLTF } from "@react-three/drei";
import { FC, memo, useMemo } from "react";
import * as THREE from "three";
import Model from "./Model";

interface WheelsProps {
  axleHeight: number;
}

const Wheels: FC<WheelsProps> = memo(({ axleHeight }) => {
  const { activeVehicle } = useVehicleContext();
  const scalingFactor = useVehicleScalingFactor();
  const currentVehicle = MASTER_DATA.vehicles[activeVehicle.id];
  const currentRim = MASTER_DATA.wheels.rims[activeVehicle.rim];
  const {
    rim,
    rim_front_diameter,
    rim_rear_diameter,
    tire_front_width,
    tire_rear_width,
    tire,
    tire_aspectRatio,
  } = activeVehicle;

  // Load models.
  const tireGltf = useGLTF(MASTER_DATA.wheels.tires[tire].model);

  // Scale tires for the front and rear.
  const frontTireGeometry = useMemo(() => {
    const mesh = tireGltf.scene.children[0] as THREE.Mesh;
    const geometry = normalizeGeometry(mesh);
    const frontTireWidth = mmToMeters(tire_front_width);
    const frontRimDiameter = inchToMeters(rim_front_diameter);
    const frontTireDiameter =
      frontRimDiameter + 2 * (frontTireWidth * (tire_aspectRatio / 100));

    return scaleTireGeometry(
      geometry,
      frontTireWidth,
      frontRimDiameter,
      frontTireDiameter,
      tire
    );
  }, [tireGltf, rim_front_diameter, tire_front_width, tire, tire_aspectRatio]);

  // Scale tires for the front and rear.
  const rearTireGeometry = useMemo(() => {
    const mesh = tireGltf.scene.children[0] as THREE.Mesh;
    const geometry = normalizeGeometry(mesh);
    const rearTireWidth = mmToMeters(tire_rear_width);
    const rearRimDiameter = inchToMeters(rim_rear_diameter);
    const rearTireDiameter =
      rearRimDiameter + 2 * (rearTireWidth * (tire_aspectRatio / 100));

    return scaleTireGeometry(
      geometry,
      rearTireWidth,
      rearRimDiameter,
      rearTireDiameter,
      tire
    );
  }, [tireGltf, rim_rear_diameter, tire_rear_width, tire, tire_aspectRatio]);

  // Calculate rim scale as a percentage of diameter.
  const odFrontScale = useMemo(
    () => ((rim_front_diameter * 2.54) / 100 + 0.03175) / currentRim.od,
    [rim, rim_front_diameter]
  );

  // Calculate rim scale as a percentage of diameter.
  const odRearScale = useMemo(
    () => ((rim_rear_diameter * 2.54) / 100 + 0.03175) / currentRim.od,
    [rim, rim_rear_diameter]
  );

  // Calculate rim width.
  const widthFrontScale = useMemo(
    () => (tire_front_width * 2.54) / 100 / currentRim.width,
    [rim, tire_front_width]
  );
  const widthRearScale = useMemo(
    () => (tire_rear_width * 2.54) / 100 / currentRim.width,
    [rim, tire_rear_width]
  );

  // Build wheel transforms for front and rear wheels.
  const wheelTransforms: WheelTransformation[] = useMemo(() => {
    const rotation = (Math.PI * 90) / 180;
    const steering = (Math.PI * currentVehicle.steering) / 180;
    const scaledOffset = currentVehicle.wheel_offset * scalingFactor;
    const scaledFrontOffset = currentVehicle.origin_to_front * scalingFactor;
    const scaledRearOffset = currentVehicle.origin_to_rear * scalingFactor;
    return [
      {
        key: "FL",
        position: [scaledOffset, axleHeight, scaledFrontOffset],
        rotation: [0, rotation + steering, 0],
        tireGeometry: frontTireGeometry,
        widthScale: widthFrontScale,
        odScale: odFrontScale,
      },
      {
        key: "FR",
        position: [-scaledOffset, axleHeight, scaledFrontOffset],
        rotation: [0, -rotation + steering, 0],
        tireGeometry: frontTireGeometry,
        widthScale: widthFrontScale,
        odScale: odFrontScale,
      },
      {
        key: "RL",
        position: [scaledOffset, axleHeight, -scaledRearOffset],
        rotation: [0, rotation, 0] as [number, number, number],
        tireGeometry: rearTireGeometry,
        widthScale: widthRearScale,
        odScale: odRearScale,
      },
      {
        key: "RR",
        position: [-scaledOffset, axleHeight, -scaledRearOffset],
        rotation: [0, -rotation, 0],
        tireGeometry: rearTireGeometry,
        widthScale: widthRearScale,
        odScale: odRearScale,
      },
    ];
  }, [axleHeight, currentVehicle, activeVehicle]);

  return (
    <group name="Wheels">
      {wheelTransforms.map(
        ({ key, position, rotation, tireGeometry, widthScale, odScale }) => (
          <group key={key} position={position} rotation={rotation}>
            <Model
              path={currentRim.model}
              scale={[odScale, odScale, widthScale / 25.4]}
              name="Rim"
              isRim={true}
            />
            <mesh name="Tire" geometry={tireGeometry} castShadow>
              <meshStandardMaterial color="#121212" />
            </mesh>
          </group>
        )
      )}
    </group>
  );
});

export default Wheels;
