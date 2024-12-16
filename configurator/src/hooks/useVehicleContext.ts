import { useContext } from 'react';
import { VehicleContext } from '../lib/activeVehicle';

const useVehicleContext = () => {
    const context = useContext(VehicleContext);
    if (!context) {
        throw new Error('useVehicleContext must be used within a VehicleProvider');
    }
    return context;
};

export default useVehicleContext;