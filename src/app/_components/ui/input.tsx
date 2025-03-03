import { cn } from "@/app/_libs/classnames";
import * as React from "react";

type InputProps = React.ComponentProps<"input">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

type InputWithIconProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  containerClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
};

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, className, type, containerClassName, ...props }, ref) => {
    if (!icon) {
      return <Input type={type} className={className} ref={ref} {...props} />;
    }

    return (
      <div
        className={cn(
          "flex h-12 items-center rounded-md border border-input bg-background pl-3 ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          containerClassName,
        )}
      >
        {icon}
        <input
          type={type}
          className={cn(
            "h-11 w-full rounded-md bg-background p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
InputWithIcon.displayName = "InputWithIcon";

export { Input, InputWithIcon, type InputProps, type InputWithIconProps };
