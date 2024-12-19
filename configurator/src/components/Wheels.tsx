import useMaterialProperties from "@/hooks/useMaterialProperties";
import { MASTER_DATA } from "@/lib/data";
import { scaleTireGeometry } from "@/lib/utils";
import { useGLTF } from "@react-three/drei";
import { FC, memo, useEffect, useMemo } from "react";

interface WheelsProps {
  rim: string;
  rim_front_diameter: number;
  rim_rear_diameter: number;
  rim_front_width: number;
  rim_rear_width: number;
  rim_color: string;
  tire: string;
  tire_aspectRatio: number;
  offset: number;
  wheelbase: number;
  axleHeight: number;
  color: string;
  finish: number;
}

const Wheels: FC<WheelsProps> = memo(
  ({
    rim,
    rim_front_diameter,
    rim_rear_diameter,
    rim_front_width,
    rim_rear_width,
    rim_color,
    tire,
    tire_aspectRatio,
    offset,
    wheelbase,
    axleHeight,
    color,
    finish,
  }) => {
    const { setObjectMaterials } = useMaterialProperties();

    const converted_rim_front_width = rim_front_width / 25.4;
    const converted_rim_rear_width = rim_rear_width / 25.4;

    const tire_front_diameter =
      converted_rim_front_width * (tire_aspectRatio / 100) * 2 +
      rim_front_diameter;
    const tire_rear_diameter =
      converted_rim_rear_width * (tire_aspectRatio / 100) * 2 +
      rim_rear_diameter;

    // Load models.
    const rimGltf = useGLTF(MASTER_DATA.wheels.rims[rim].model);
    const tireGltf = useGLTF(MASTER_DATA.wheels.tires[tire].model);

    // Scale tires for the front and rear.
    const frontTireGeometry = useMemo(() => {
      // Determine y scale for front tire.
      const wheelFrontWidth = (converted_rim_front_width * 2.54) / 100;
      const frontWidthScale =
        wheelFrontWidth / MASTER_DATA.wheels.tires[tire].width;

      return scaleTireGeometry(
        tireGltf,
        frontWidthScale,
        rim_front_diameter,
        tire_front_diameter,
        tire
      );
    }, [
      tireGltf,
      rim_front_diameter,
      converted_rim_front_width,
      tire,
      tire_aspectRatio,
    ]);

    const rearTireGeometry = useMemo(() => {
      // Determine y scale for rear tire.
      const wheelRearWidth = (converted_rim_rear_width * 2.54) / 100;
      const rearWidthScale =
        wheelRearWidth / MASTER_DATA.wheels.tires[tire].width;

      return scaleTireGeometry(
        tireGltf,
        rearWidthScale,
        rim_rear_diameter,
        tire_rear_diameter,
        tire
      );
    }, [
      tireGltf,
      rim_rear_diameter,
      converted_rim_rear_width,
      tire,
      tire_aspectRatio,
    ]);

    // Calculate rim scale as a percentage of diameter.
    const odFrontScale = useMemo(
      () =>
        ((rim_front_diameter * 2.54) / 100 + 0.03175) /
        MASTER_DATA.wheels.rims[rim].od,
      [rim, rim_front_diameter]
    );

    // Calculate rim scale as a percentage of diameter.
    const odRearScale = useMemo(
      () =>
        ((rim_rear_diameter * 2.54) / 100 + 0.03175) /
        MASTER_DATA.wheels.rims[rim].od,
      [rim, rim_rear_diameter]
    );

    // Calculate rim width.
    const widthFrontScale = useMemo(
      () => (rim_front_width * 2.54) / 100 / MASTER_DATA.wheels.rims[rim].width,
      [rim, rim_front_width]
    );
    const widthRearScale = useMemo(
      () => (rim_rear_width * 2.54) / 100 / MASTER_DATA.wheels.rims[rim].width,
      [rim, rim_rear_width]
    );

    // Set rim color.
    useEffect(() => {
      setObjectMaterials(rimGltf.scene, color, finish, rim_color);
    }, [rimGltf.scene, setObjectMaterials, rim_color, color, finish]);

    // Build wheel transforms for front and rear wheels.
    const wheelTransforms = useMemo(() => {
      const rotation = (Math.PI * 90) / 180;
      const steering = (Math.PI * -10) / 180;
      return [
        {
          key: "FL",
          position: [offset, axleHeight, wheelbase / 2] as [
            number,
            number,
            number
          ],
          rotation: [0, rotation + steering, 0] as [number, number, number],
          tireGeometry: frontTireGeometry,
          widthScale: widthFrontScale,
          odScale: odFrontScale,
        },
        {
          key: "FR",
          position: [-offset, axleHeight, wheelbase / 2] as [
            number,
            number,
            number
          ],
          rotation: [0, -rotation + steering, 0] as [number, number, number],
          tireGeometry: frontTireGeometry,
          widthScale: widthFrontScale,
          odScale: odFrontScale,
        },
        {
          key: "RL",
          position: [offset, axleHeight, -wheelbase / 2] as [
            number,
            number,
            number
          ],
          rotation: [0, rotation, 0] as [number, number, number],
          tireGeometry: rearTireGeometry,
          widthScale: widthRearScale,
          odScale: odRearScale,
        },
        {
          key: "RR",
          position: [-offset, axleHeight, -wheelbase / 2] as [
            number,
            number,
            number
          ],
          rotation: [0, -rotation, 0] as [number, number, number],
          tireGeometry: rearTireGeometry,
          widthScale: widthRearScale,
          odScale: odRearScale,
        },
      ];
    }, [
      offset,
      axleHeight,
      wheelbase,
      frontTireGeometry,
      rearTireGeometry,
      widthFrontScale,
      widthRearScale,
      odFrontScale,
      odRearScale,
    ]);

    return (
      <group name="Wheels">
        {wheelTransforms.map(
          ({ key, position, rotation, tireGeometry, widthScale, odScale }) => (
            <group key={key} position={position} rotation={rotation}>
              <primitive
                name="Rim"
                object={rimGltf.scene.clone()}
                scale={[odScale, odScale, widthScale / 25.4]}
              />
              <mesh name="Tire" geometry={tireGeometry} castShadow>
                <meshStandardMaterial color="#121212" />
              </mesh>
            </group>
          )
        )}
      </group>
    );
  }
);

export default Wheels;
