import * as React from "react";
import Vehicle from "@/assets/icons/Vehicle";
import Rims from "@/assets/icons/Rims";
import Tires from "@/assets/icons/Tires";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { INavIcons } from "@/lib/types";
import VehicleEditor from "../Editors/VehicleEditor";
import RimsEditor from "../Editors/RimsEditor";
import TiresEditor from "../Editors/TiresEditor";

const navIcons: INavIcons[] = [
  {
    title: "Vehicle",
    icon: Vehicle,
    isActive: true,
  },
  {
    title: "Rims",
    icon: Rims,
    isActive: false,
  },
  {
    title: "Tires",
    icon: Tires,
    isActive: false,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState<INavIcons>(navIcons[0]);
  const { setOpen } = useSidebar();

  const renderEditor = () => {
    switch (activeItem.title.toLowerCase()) {
      case "vehicle":
        return <VehicleEditor title="Vehicle"/>;
      case "rims":
        return <RimsEditor title="Rims"/>;
      case "tires":
        return <TiresEditor title="Tires"/>;
      default:
        return null;
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader></SidebarHeader>
        <SidebarContent className="flex flex-col justify-center">
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {navIcons.map((item) => (
                  <SidebarMenuItem key={item.title} className="my-2">
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setActiveItem(item);
                      }}
                      isActive={activeItem.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon size={32} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarContent>
          {renderEditor()}
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
