"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      {...props}
    />
  );
};

export default Toaster;
