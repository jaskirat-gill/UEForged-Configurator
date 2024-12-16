import { ThemeProvider } from "@/contexts/ThemeProvider";
import Viewport from "./components/Viewport";
import SidebarComponent from "./components/Sidebar/Sidebar";
import { VehicleProvider } from "./contexts/ActiveVehicle";
function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <VehicleProvider>
          <div>
            <SidebarComponent />
          </div>
          <div className="">{/* <Viewport /> */}</div>
        </VehicleProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
