import { IconProps } from "@/lib/types";
import React from "react";

const Vehicle: React.FC<IconProps> = ({ color = "#FFFFFF", size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 514.1 514.1"
      width={size}
      height={size}
    >
      <path
        fill={color}
        d="M508.6 259.3c-4.3 0-9.5-3.8-11.7-8.5l-8.4-18a18 18 0 00-13.2-9.3l-111-10.6a23.3 23.3 0 01-14.6-8.5l-40.4-56.2c-3-4.2-9.5-7.5-14.7-7.5h-69c-5.1 0-11.4-2.4-14-5.3-2.5-2.9-8.7-5.2-13.9-5.2H71a14 14 0 00-12.4 8.8L46 175.9c-1.6-5.8-10.6-10.3-21.7-10.3H22a22 22 0 00-22 22v57.7c0 12 4.3 21.7 9.7 22A25.4 25.4 0 007 277.8v13.3c0 5 4.2 9.3 9.3 9.3h29l9.3.3A65.3 65.3 0 10183 318.6v-.1h178.5a65.4 65.4 0 10128.7-16l4.1.2c5.2.2 10.5-3.6 12-8.6l7.5-25.9c1.5-5-.8-9-5.1-9zm-325.7-55.8H56.2l14.4-51.2h112.3v51.2zm31.9 3.8l-.2-48.8h80.6l36 48.8H214.7z"
      />
    </svg>
  );
};

export default Vehicle;
