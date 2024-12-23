import withEditorLayout from "./withEditorLayout";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card } from "../ui/card";
import { Tooltip, TooltipProvider } from "../ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { EDITOR_DATA, MASTER_DATA } from "@/lib/data";
import useVehicleContext from "@/hooks/useVehicleContext";

const RimsEditor = () => {
  const { activeVehicle, updateActiveVehicle } = useVehicleContext();
  const { rim, rim_color, color } = activeVehicle;

  const handleRimColorChange = (rimColor: string) => {
    updateActiveVehicle({ rim_color: rimColor });
  };

  const handleRimChange = (rim: string) => {
    updateActiveVehicle({ rim: rim });
  };

  return (
    <>
      <div className="flex flex-col items-left">
        <Label className="text-lg">Style</Label>
        <div className="grid grid-cols-2 gap-4 my-2 max-h-96 overflow-y-auto">
          {Object.entries(MASTER_DATA.wheels.rims).map(([id, rimData]) => {
            const isActive = rim === id;
            return (
              <Card
                id={id}
                key={id}
                onClick={() => handleRimChange(id)}
                className={`p-1 transform transition-transform duration-300 hover:scale-105 ${
                  isActive ? "border-2 border-blue-500" : ""
                }`}
              >
                <img
                  src={rimData.thumbnail}
                  alt={rimData.name}
                  className="w-full h-32 object-cover rounded"
                />
                <div className="mt-2 text-center">
                  {rimData.make} {rimData.name}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-left">
        <Label className="text-lg">Color</Label>
        <div className="flex space-x-4 my-4">
          {EDITOR_DATA.rim_colors.map((rimColor, index: number) => {
            const isActive = rim_color === rimColor.label;
            if (rimColor.name === "Body Match") {
              rimColor.color = color;
            }
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card
                      className={`w-1/4 h-12 p-1 transform transition-transform duration-300 hover:scale-105 ${
                        isActive ? "border-2 border-blue-500" : ""
                      }`}
                      style={{ backgroundColor: rimColor.color }}
                      onClick={() => handleRimColorChange(rimColor.label)}
                    ></Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{rimColor.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-left m">
        <Label className="text-lg">Front Diameter</Label>
        <Select
          onValueChange={(value) =>
            updateActiveVehicle({ rim_front_diameter: parseFloat(value) })
          }
        >
          <SelectTrigger className="my-2">
            <SelectValue placeholder={activeVehicle.rim_front_diameter} />
          </SelectTrigger>
          <SelectContent>
            {Array.from(
              {
                length:
                  EDITOR_DATA.max_rim_diameter -
                  EDITOR_DATA.min_rim_diameter +
                  1,
              },
              (_, i) => (
                <SelectItem
                  key={i}
                  value={`${EDITOR_DATA.min_rim_diameter + i}`}
                >
                  {EDITOR_DATA.min_rim_diameter + i}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-left">
        <Label className="text-lg">Rear Diameter</Label>
        <Select
          onValueChange={(value) =>
            updateActiveVehicle({ rim_rear_diameter: parseFloat(value) })
          }
        >
          <SelectTrigger className="my-2">
            <SelectValue placeholder={activeVehicle.rim_rear_diameter} />
          </SelectTrigger>
          <SelectContent>
            {Array.from(
              {
                length:
                  EDITOR_DATA.max_rim_diameter -
                  EDITOR_DATA.min_rim_diameter +
                  1,
              },
              (_, i) => (
                <SelectItem
                  key={i}
                  value={`${EDITOR_DATA.min_rim_diameter + i}`}
                >
                  {EDITOR_DATA.min_rim_diameter + i}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default withEditorLayout(RimsEditor);
