import { FC, memo, useEffect, useState } from "react";
import { BACKENDURL } from "@/lib/data";
import { useGLTF } from "@react-three/drei";
interface ModelProps extends React.ComponentPropsWithoutRef<"primitive"> {
  path: string;
}

const Model: FC<ModelProps> = memo(({ path, ...props }) => {
  const [url, setUrl] = useState<string | null>(null);
  const algorithm = import.meta.env.VITE_ENCRYPTION_ALGORITHM;
  const secretKey = import.meta.env.VITE_SECRET_KEY;

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

  if (!url) {
    return null;
  }
  const { scene } = useGLTF(url);

  return (
    <primitive object={scene} {...props} />
  )
});

export default Model;
