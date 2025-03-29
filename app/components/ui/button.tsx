"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-[#2c5282] text-white hover:bg-[#1a365d]",
        destructive: "bg-[#e02424] text-white hover:bg-[#b91c1c]",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-[#5a9bd3] text-white hover:bg-[#4c84b5]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-[#2c5282]",
        
        // Gradient varianten
        gradient: "bg-gradient-to-r from-[#3182ce] to-[#5a9bd3] text-white hover:opacity-90",
        "gradient-purple": "bg-gradient-to-r from-[#5a67d8] to-[#7e3af2] text-white hover:opacity-90",
        "gradient-mixed": "bg-gradient-to-r from-[#3182ce] to-[#7e3af2] text-white hover:opacity-90",
        "gradient-warm": "bg-gradient-to-r from-[#ff9e2c] to-[#e02424] text-white hover:opacity-90",
        "gradient-teal": "bg-gradient-to-r from-[#0d9488] to-[#16bdca] text-white hover:opacity-90",
        
        // Nieuwe solid kleurvarianten
        purple: "bg-[#7e3af2] text-white hover:bg-[#6c2bd9]",
        teal: "bg-[#16bdca] text-white hover:bg-[#0d9488]",
        amber: "bg-[#ff9e2c] text-white hover:bg-[#f59e0b]",
        
        // Functionele varianten
        success: "bg-[#3dad7e] text-white hover:bg-[#2f855a]",
        warning: "bg-[#ff9e2c] text-white hover:bg-[#f59e0b]",
        info: "bg-[#4299e1] text-white hover:bg-[#3182ce]",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        xl: "h-12 px-10 rounded-md text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 