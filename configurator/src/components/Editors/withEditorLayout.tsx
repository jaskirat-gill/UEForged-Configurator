import React from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

interface WithEditorLayoutProps {
  title: string;
}

const withEditorLayout = (WrappedComponent: React.ComponentType) => {
  return ({ title, ...props }: WithEditorLayoutProps) => (
    <div className="flex flex-col justify-center mt-4 ml-4 mr-4 space-y-4">
      <div className="flex flex-row items-center justify-between">
        <Label className="text-xl">{title}</Label>
        <SidebarTrigger />
      </div>
      <Separator />
      <WrappedComponent {...props} />
    </div>
  );
};

export default withEditorLayout;
