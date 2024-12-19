import { useMemo, FC } from "react";

import useVehicleContext from "@/hooks/useVehicleContext";
import { MASTER_DATA } from "@/lib/data";
import Body from "./Body";
import Wheels from "./Wheels";

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
      <Body id={id} height={vehicleHeight} color={color} finish={finish} />
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
