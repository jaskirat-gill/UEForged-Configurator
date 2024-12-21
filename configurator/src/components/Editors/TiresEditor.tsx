import withEditorLayout from "./withEditorLayout";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EDITOR_DATA } from "@/lib/data";
import useVehicleContext from "@/hooks/useVehicleContext";

const TiresEditor = () => {
  const { activeVehicle, updateActiveVehicle } = useVehicleContext();
  const { tire_front_width, tire_rear_width } = activeVehicle;

  const handleFrontWidthChange = (value: string) => {
    updateActiveVehicle({ tire_front_width: parseFloat(value) });
  };

  const handleRearWidthChange = (value: string) => {
    updateActiveVehicle({ tire_rear_width: parseFloat(value) });
  };

  return (
    <>
      <div className="flex flex-col items-left">
        <Label className="text-lg">Front Width</Label>
        <Select onValueChange={handleFrontWidthChange}>
          <SelectTrigger className="my-2">
            <SelectValue
              placeholder={
                tire_front_width || EDITOR_DATA.defaults.front_tire_width
              }
            />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(EDITOR_DATA.tire_widths).map(([id, width]) => (
              <SelectItem key={id} value={width.toString()}>
                {width} mm
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-left">
        <Label className="text-lg">Rear Width</Label>
        <Select onValueChange={handleRearWidthChange}>
          <SelectTrigger className="my-2">
            <SelectValue
              placeholder={
                tire_rear_width || EDITOR_DATA.defaults.rear_tire_width
              }
            />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(EDITOR_DATA.tire_widths).map(([id, width]) => (
              <SelectItem key={id} value={width.toString()}>
                {width} mm
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-left">
        <Label className="text-lg">Aspect Ratio</Label>
        <Select
          onValueChange={(value) =>
            updateActiveVehicle({ tire_aspectRatio: parseFloat(value) })
          }
        >
          <SelectTrigger className="my-2">
            <SelectValue placeholder={EDITOR_DATA.defaults.tire_aspectRatio} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(EDITOR_DATA.tire_aspectRatios).map(
              ([id, ratio]) => (
                <SelectItem key={id} value={ratio.toString()}>
                  {ratio}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default withEditorLayout(TiresEditor);
