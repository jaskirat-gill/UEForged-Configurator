import { memo, useMemo, useEffect, useRef, FC } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3, Group, Mesh } from "three";
import useMaterialProperties from "../hooks/useMaterialProperties";
import useVehicleContext from "@/hooks/useVehicleContext";
import { MASTER_DATA } from "@/lib/data";

// Define types for props and vehicle data.
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

interface BodyProps {
  id: string;
  height: number;
  color: string;
  finish: number;
}

// Calculate point on line (a to b, at length).
const linePoint = (a: Vector3, b: Vector3, length: number): Vector3 => {
  const dir = b.clone().sub(a).normalize().multiplyScalar(length);
  return a.clone().add(dir);
};

// Model loader.
const Model: FC<{ path: string }> = memo(({ path, ...props }) => {
  const model = useGLTF(path);
  return <primitive object={model.scene} {...props} />;
});

// Wheels.
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
      () =>
        (rim_front_width * 2.54) / 100 / MASTER_DATA.wheels.rims[rim].width,
      [rim, rim_front_width]
    );
    const widthRearScale = useMemo(
      () =>
        (rim_rear_width * 2.54) / 100 / MASTER_DATA.wheels.rims[rim].width,
      [rim, rim_rear_width]
    );

    // Set rim color.
    useEffect(() => {
      setObjectMaterials(
        rimGltf.scene,
        color,
        finish,
        rim_color,
      );
    }, [
      rimGltf.scene,
      setObjectMaterials,
      rim_color,
      color,
      finish,
    ]);

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

// Helper function to scale tire geometry
const scaleTireGeometry = (
  tireGltf: any,
  widthScale: number,
  rim_diameter: number,
  tire_diameter: number,
  label: string
) => {
  const tireOD = MASTER_DATA.wheels.tires[label].od / 2;
  const tireID = MASTER_DATA.wheels.tires[label].id
    ? MASTER_DATA.wheels.tires[label].id / 2
    : 0;

  const newOd = (tire_diameter * 2.54) / 10 / 2;
  const newId = (rim_diameter * 2.54) / 10 / 2;

  // Create a copy of the original geometry.
  const mesh = tireGltf.scene.children[0] as Mesh;
  const geometry = mesh.geometry.clone();

  // Scale to match wheel width.
  geometry.scale(1, 1, widthScale);

  // Get position attributes.
  const positionAttribute = geometry.getAttribute("position");
  const positionArray = positionAttribute.array;

  // Loop through vertices to adjust the shape based on rim and tire diameters.
  for (let i = 0, l = positionAttribute.count; i < l; i++) {
    const startVector = new Vector3().fromBufferAttribute(positionAttribute, i);
    const centerVector = new Vector3(0, 0, startVector.z);
    const centerDist = centerVector.distanceTo(startVector);
    const rimDist = centerDist - tireID;
    const percentOut = rimDist / (tireOD - tireID);
    const newRimDist = (percentOut * (newOd - newId) + newId) / 10;
    const setVector = linePoint(centerVector, startVector, newRimDist);
    (positionArray as Float32Array)[i * 3] = setVector.x;
    (positionArray as Float32Array)[i * 3 + 1] = setVector.y;
  }

  return geometry;
};

// Body.
const Body: FC<BodyProps> = memo(({ id, height, color, finish }) => {
  const vehicle = useRef<Group>(null);
  const { setObjectMaterials } = useMaterialProperties();

  // Set body color.
  useEffect(() => {
    if (vehicle.current) {
      setObjectMaterials(vehicle.current, color, finish);
    }
  }, [setObjectMaterials, color, finish]);


  return (
    <group ref={vehicle} name="Body" key={id}>
      <Model path={MASTER_DATA.vehicles[id].model} />
    </group>
  );
});

// Vehicle.
const Vehicle: FC = () => {
  const { activeVehicle } = useVehicleContext();
  const {
    id,
    color,
    finish,
    lift,
    rim,
    rim_front_diameter,
    rim_rear_diameter,
    tire_front_width,
    tire_rear_width,
    rim_color,
    tire,
    tire_aspectRatio,
  } = activeVehicle;

  // Get wheel (axle) height.
  const axleHeight = useMemo(
    () =>
      (((tire_rear_width / 25.4) * (tire_aspectRatio / 100) * 2 +
        rim_rear_diameter) *
        2.54) /
      100 /
      2,
    [tire_aspectRatio]
  );

  // Get lift height in meters.
  const liftHeight = useMemo(() => {
    const liftInches = lift || 0;
    return (liftInches * 2.54) / 100;
  }, [lift]);

  // Get vehicle height.
  const vehicleHeight = useMemo(
    () => axleHeight + liftHeight,
    [axleHeight, liftHeight]
  );

  const offset = MASTER_DATA.vehicles[id].wheel_offset;
  const wheelbase = MASTER_DATA.vehicles[id].wheelbase;

  return (
    <group name="Vehicle">
      <Body
        id={id}
        height={vehicleHeight}
        color={color}
        finish={finish}
      />
      <Wheels
        rim={rim}
        rim_front_diameter={rim_front_diameter}
        rim_rear_diameter={rim_rear_diameter}
        rim_front_width={tire_front_width}
        rim_rear_width={tire_rear_width}
        rim_color={rim_color}
        tire={tire}
        tire_aspectRatio={tire_aspectRatio}
        offset={offset}
        axleHeight={axleHeight}
        wheelbase={wheelbase}
        color={color}
        finish={finish}
      />
    </group>
  );
};

export default Vehicle;
