import { ThemeProvider } from "@/contexts/ThemeProvider";
import Viewport from "./components/Viewport";
import SidebarComponent from "./components/Sidebar/Sidebar";
import { VehicleProvider } from "./contexts/ActiveVehicle";
import Loader from "./components/Loader";
import { useState } from "react";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <VehicleProvider>
          <div className="flex w-screen relative">
            <div className="flex-none">
              <SidebarComponent />
            </div>
            <div className="flex-grow">
              <Viewport setIsLoaded={setIsLoaded} />
            </div>
            {!isLoaded && <Loader />}
          </div>
        </VehicleProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
