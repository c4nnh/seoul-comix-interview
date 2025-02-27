import { cn } from "@/app/_libs/classnames";
import { HTMLAttributes, useState } from "react";
import { ControllerProps } from "react-hook-form";
import { IconClosedEye } from "../icons/closed-eye";
import { IconEye } from "../icons/eye";
import { InputProps } from "../ui/input";
import { Label } from "../ui/label";
import { ControlledFormItem } from "./controlled-form-item";

type FormPasswordProps<T> = React.PropsWithChildren<
  {
    name: keyof T;
    label: string;
  } & Omit<ControllerProps, "render"> & {
      inputProps?: Omit<InputProps, "type">;
      className?: HTMLAttributes<HTMLDivElement>["className"];
      labelClassName?: HTMLAttributes<HTMLLabelElement>["className"];
    }
>;

export function FormPasswordInput<T>({
  inputProps = {},
  name,
  label,
  className,
  labelClassName,
  ...controlledFormItemProps
}: FormPasswordProps<T>) {
  const [type, setType] = useState<InputProps["type"]>("password");

  return (
    <ControlledFormItem
      name={name}
      {...controlledFormItemProps}
      render={({ value, onChange, onBlur }) => (
        <div className="flex flex-col gap-1">
          <Label
            htmlFor={name}
            className={cn("text-base font-semibold", labelClassName)}
          >
            {label}
          </Label>
          <div
            className={cn(
              "flex h-12 items-center rounded-md border border-input bg-background pl-3 pr-2 ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
              "",
            )}
          >
            <input
              type={type}
              className={cn(
                "w-full bg-background pr-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              )}
              {...{ value, onChange, onBlur }}
              {...inputProps}
            />
            {type === "password" ? (
              <IconClosedEye
                className="h-4 w-4 cursor-pointer"
                onClick={() => setType("text")}
              />
            ) : (
              <IconEye
                className="h-4 w-4 cursor-pointer"
                onClick={() => setType("password")}
              />
            )}
          </div>
        </div>
      )}
    />
  );
}
