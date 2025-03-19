
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glassmorphism?: boolean;
}

const Card = ({ 
  children, 
  className, 
  hover = false,
  glassmorphism = false
}: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 p-6 shadow-sm",
        hover && "transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]",
        glassmorphism && "bg-white/90 backdrop-blur-md border-white/20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
