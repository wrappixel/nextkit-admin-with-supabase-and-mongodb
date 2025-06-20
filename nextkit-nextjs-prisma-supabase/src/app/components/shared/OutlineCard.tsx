"use client";
import { CustomizerContext } from "@/app/context/customizerContext";

import { Card } from "flowbite-react";
import React, { useContext } from "react";


interface MyAppProps {
  children: React.ReactNode;
  className?: string;
}
const OutlineCard: React.FC<MyAppProps> = ({ children, className }) => {
  const { activeMode, isCardShadow } = useContext(CustomizerContext);
  return (
    <Card className={`card ${className} ${isCardShadow ? ' border border-ld' : ' border border-ld'} `}>{children}</Card>
  );

};

export default OutlineCard;
