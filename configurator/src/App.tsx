import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import Viewport from "./components/Viewport";
import SidebarComponent from "./components/Sidebar/Sidebar";
import { VehicleProvider } from "./lib/activeVehicle";
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
