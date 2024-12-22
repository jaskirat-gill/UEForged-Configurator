import React, { createContext, ReactNode, useContext, useRef } from 'react';
import { Camera } from 'three';

const CameraContext = createContext<React.MutableRefObject<Camera | null> | null>(null);

export const CameraProvider = ({ children }: { children: ReactNode })  => {
  const cameraRef = useRef<Camera | null>(null);
  return (
    <CameraContext.Provider value={cameraRef}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCamera = () => {
  return useContext(CameraContext);
};