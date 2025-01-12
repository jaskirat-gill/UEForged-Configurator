import { FC, memo, useEffect, useState } from "react";
import { BACKENDURL } from "@/lib/data";
import { useGLTF } from "@react-three/drei";
import useMaterialProperties from "@/hooks/useMaterialProperties";
import useVehicleContext from "@/hooks/useVehicleContext";
interface ModelProps extends React.ComponentPropsWithoutRef<"primitive"> {
  path: string;
}

const Model: FC<ModelProps> = memo(({ path, ...props }) => {
  const [url, setUrl] = useState<string>("");
  const algorithm = import.meta.env.VITE_ENCRYPTION_ALGORITHM;
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  const { setObjectMaterials } = useMaterialProperties();
  const { activeVehicle } = useVehicleContext();
  const {
    color,
    finish,
    rim_color,
  } = activeVehicle;

  useEffect(() => {
    const fetchAndDecryptModel = async () => {
      const response = await fetch(`${BACKENDURL}${path}`);

      if (!response.ok) {
        throw new Error("Failed to fetch the encrypted model");
      }

      const encryptedData = await response.arrayBuffer();

      const iv = new Uint8Array(encryptedData.slice(0, 16));
      const encryptedContent = encryptedData.slice(16);

      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secretKey),
        { name: algorithm },
        false,
        ["decrypt"]
      );

      const decryptedContent = await crypto.subtle.decrypt(
        {
          name: algorithm,
          counter: iv,
          length: 128,
        },
        key,
        encryptedContent
      );

      // Create a blob and generate a URL
      const blob = new Blob([decryptedContent], { type: "model/gltf-binary" });
      const url = URL.createObjectURL(blob);
      setUrl(url);
    };

    fetchAndDecryptModel();
  }, [path]);

  const { scene } = url ? useGLTF(url) : { scene: null };

  useEffect(() => {
    if (scene) {
      setObjectMaterials(scene, color, finish, rim_color);
    }
  }, [scene, setObjectMaterials, rim_color, color, finish]);
  
  if (!url || !scene) {
    return null;
  }

  return (
    <primitive object={scene.clone()} {...props} />
  )
});

export default Model;
