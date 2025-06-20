"use client";

import { CustomizerContext } from "@/app/context/customizerContext";

import { Card } from "flowbite-react";
import React, { useContext } from "react";


interface MyAppProps {
  children: React.ReactNode;
  className?: string;
}
const CardBox: React.FC<MyAppProps> = ({ children, className }) => {
  const { isBorderRadius } = useContext(CustomizerContext);
  return (
    <Card className={`card ${className} shadow-none border border-ld`}
      style={{
        borderRadius: `${isBorderRadius}px`,
      }}
    >{children}</Card>
  );

};

export default CardBox;
