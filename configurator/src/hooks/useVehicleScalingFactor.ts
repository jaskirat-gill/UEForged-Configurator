import { useMemo } from 'react';
import useVehicleContext from '@/hooks/useVehicleContext';
import { MASTER_DATA } from '@/lib/data';

const useVehicleScalingFactor = () => {
  const { activeVehicle } = useVehicleContext();

  const vehicleScalingFactor = useMemo(() => {
    const vehicleData = MASTER_DATA.vehicles[activeVehicle.id];
    const desiredWheelbase = vehicleData.actual_wheelbase;
    const modelWheelbase = vehicleData.model_orgin_to_front + vehicleData.model_orgin_to_rear;
    return desiredWheelbase / modelWheelbase;
  }, [activeVehicle.id]);

  return vehicleScalingFactor;
};

export default useVehicleScalingFactor;