import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/30",
        outline: "border-2 border-primary bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        voice: "bg-voice-inactive text-foreground hover:bg-voice-active hover:text-primary-foreground hover:shadow-xl hover:shadow-glow/40 active:scale-95",
        emergency: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-2xl hover:shadow-glow-emergency/50 text-accessible-lg font-extrabold",
        tactile: "bg-card text-card-foreground border-2 border-primary/30 hover:border-primary hover:bg-card/80 hover:shadow-lg hover:shadow-primary/20",
      },
      size: {
        default: "h-14 px-8 py-4 text-accessible-base",
        sm: "h-12 px-6 text-accessible-sm",
        lg: "h-20 px-12 text-accessible-lg",
        xl: "h-28 w-28 text-accessible-xl",
        icon: "h-16 w-16 text-accessible-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
