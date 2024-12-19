import { useMemo } from 'react';
import useVehicleContext from '@/hooks/useVehicleContext';
import { MASTER_DATA } from '@/lib/data';

const useVehicleScalingFactor = () => {
  const { activeVehicle } = useVehicleContext();

  const vehicleScalingFactor = useMemo(() => {
    const vehicleData = MASTER_DATA.vehicles[activeVehicle.id];
    const desiredWheelbase = vehicleData.actual_wheelbase;
    const modelWheelbase = vehicleData.wheelbase;
    return desiredWheelbase / modelWheelbase;
  }, [activeVehicle.id]);

  return vehicleScalingFactor;
};

export default useVehicleScalingFactor;