import { EDITOR_DATA, MASTER_DATA } from "@/lib/data";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import withEditorLayout from "./withEditorLayout";
import useVehicleContext from "@/hooks/useVehicleContext";

const VehicleEditor = () => {
  const { activeVehicle, updateActiveVehicle } = useVehicleContext();
  const { id, color } = activeVehicle;

  const handleModelChange = (value: string) => {
    updateActiveVehicle({ id: value });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateActiveVehicle({ color: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col items-left">
        <Label className="text-lg">Model</Label>
        <Select onValueChange={handleModelChange}>
          <SelectTrigger className="my-2">
            <SelectValue placeholder={MASTER_DATA.vehicles[id].name} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(MASTER_DATA.vehicles).map(([vehicleId, vehicle]) => (
              <SelectItem key={vehicleId} value={vehicleId}>
                {vehicle.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-left">
        <Label className="text-lg">Color</Label>
        <input
          type="color"
          className="my-2 rounded w-full cursor-pointer h-10 border-none appearance-none"
          style={{ WebkitAppearance: "none" }}
          value={color}
          onChange={handleColorChange}
        />
      </div>
      <div className="flex flex-col items-left">
        <Label className="text-lg">Finish</Label>
        <Select
          onValueChange={(value) => updateActiveVehicle({ finish: parseFloat(value) })}
        >
          <SelectTrigger className="my-2">
            <SelectValue placeholder={EDITOR_DATA.defaults.paint_finish} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(EDITOR_DATA.paint_finishes).map(([id, finish]) => (
              <SelectItem key={id} value={finish.value.toString()}>
                {finish.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-left">
        <Label className="text-lg">Lift</Label>
        <Select onValueChange={(value) => updateActiveVehicle({ lift: value })}>
          <SelectTrigger className="my-2">
            <SelectValue placeholder={EDITOR_DATA.defaults.lift} />
          </SelectTrigger>
          <SelectContent>
            {Array.from(
              { length: EDITOR_DATA.max_lift - EDITOR_DATA.min_lift + 1 },
              (_, i) => (
                <SelectItem key={i} value={`${EDITOR_DATA.min_lift + i}`}>
                  {EDITOR_DATA.min_lift + i}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default withEditorLayout(VehicleEditor);