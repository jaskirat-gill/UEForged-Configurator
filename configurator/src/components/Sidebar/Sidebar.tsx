import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const SidebarComponent = () => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "375px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />

    </SidebarProvider>
  );
};

export default SidebarComponent;
