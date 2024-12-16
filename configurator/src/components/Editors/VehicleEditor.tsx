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

  return (
    <>
      <div className="flex flex-col items-left">
        <Label className="text-lg">Model</Label>
        <Select onValueChange={(value) => updateActiveVehicle({ id: value })}>
          <SelectTrigger className="my-2">
            <SelectValue
              placeholder={MASTER_DATA.vehicles[MASTER_DATA.defaults.id].name}
            />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(MASTER_DATA.vehicles).map(([id, vehicle]) => (
              <SelectItem key={id} value={id}>
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
          style={{
            WebkitAppearance: "none",
          }}
          value={activeVehicle.color}
          onChange={(e) => updateActiveVehicle({ color: e.target.value })}
        />
      </div>
      <div className="flex flex-col items-left">
        <Label className="text-lg">Finish</Label>
        <Select
          onValueChange={(value) => updateActiveVehicle({ finish: value })}
        >
          <SelectTrigger className="my-2">
            <SelectValue placeholder={EDITOR_DATA.defaults.paint_finish} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(EDITOR_DATA.paint_finishes).map(([id, finish]) => (
              <SelectItem key={id} value={id}>
                {finish}
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
