import { useMemo, FC } from "react";
import useVehicleContext from "@/hooks/useVehicleContext";
import Body from "./Body";
import Wheels from "./Wheels";
import { inchToMeters, mmToMeters } from "@/lib/utils";

const Vehicle: FC = () => {
  const { activeVehicle } = useVehicleContext();
  const {
    id,
    color,
    finish,
    lift,
    rim_rear_diameter,
    tire_rear_width,
    tire_aspectRatio,
  } = activeVehicle;

  // Get wheel (axle) height.
  const axleHeight = useMemo(() => {
    console.log(
      (mmToMeters(tire_rear_width) * (tire_aspectRatio / 100) * 2 +
        inchToMeters(rim_rear_diameter)) /
        2
    );
    return 0.1;
  }, [tire_aspectRatio]);

  // Get lift height in meters.
  const liftHeight = useMemo(() => {
    console.log("Lift: ", inchToMeters(lift));
    return inchToMeters(lift);
  }, [lift]);

  // Get vehicle height.
  const vehicleHeight = useMemo(
    () => axleHeight + liftHeight,
    [axleHeight, liftHeight]
  );

  return (
    <group name="Vehicle">
      <Body id={id} height={vehicleHeight} color={color} finish={finish} />
      <Wheels axleHeight={axleHeight} />
    </group>
  );
};

export default Vehicle;
