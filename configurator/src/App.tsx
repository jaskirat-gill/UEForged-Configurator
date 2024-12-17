import { ThemeProvider } from "@/contexts/ThemeProvider";
import Viewport from "./components/Viewport";
import SidebarComponent from "./components/Sidebar/Sidebar";
import { VehicleProvider } from "./contexts/ActiveVehicle";
import Temp from "./components/Temp";

function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <VehicleProvider>
          <div className="flex w-screen">
            <div className="w-1/4">
              <SidebarComponent />
            </div>
            <div className="w-3/4">
              {/* <Viewport /> */}
              <Temp />
            </div>
          </div>
        </VehicleProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
