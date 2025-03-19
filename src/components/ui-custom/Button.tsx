
import React from "react";
import { cn } from "@/lib/utils";
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from "@/components/ui/button";

interface ButtonProps extends ShadcnButtonProps {
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  children,
  className,
  isLoading,
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) => {
  return (
    <ShadcnButton
      className={cn(
        "relative overflow-hidden transition-all font-medium",
        "active:scale-[0.98] duration-300",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <div className="h-5 w-5 rounded-full border-2 border-t-transparent animate-spin" />
        </div>
      )}
      
      <span className={cn(
        "flex items-center gap-2",
        isLoading ? "opacity-0" : "opacity-100"
      )}>
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </span>
    </ShadcnButton>
  );
};

export default Button;
