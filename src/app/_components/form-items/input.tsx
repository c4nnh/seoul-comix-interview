import { cn } from "@/app/_libs/classnames";
import { HTMLAttributes, PropsWithChildren } from "react";
import { ControllerProps, useFormContext } from "react-hook-form";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import { ControlledFormItem } from "./controlled-form-item";

type FormInputProps<T> = PropsWithChildren<
  {
    name: keyof T;
    label: string;
  } & Omit<ControllerProps, "render"> & {
      inputProps?: InputProps;
      className?: HTMLAttributes<HTMLDivElement>["className"];
      labelClassName?: HTMLAttributes<HTMLLabelElement>["className"];
    }
>;

export function FormInput<T>({
  inputProps = {},
  name,
  label,
  className,
  labelClassName,
  ...controlledFormItemProps
}: FormInputProps<T>) {
  const {
    formState: { errors },
  } = useFormContext();
  const hasError = !!errors[name];

  return (
    <ControlledFormItem
      name={name}
      className={className}
      {...controlledFormItemProps}
      render={({ value = "", onChange, onBlur }) => (
        <div className="flex flex-col items-start gap-1">
          <Label
            htmlFor={name}
            className={cn("text-base font-semibold", labelClassName)}
          >
            {label}
          </Label>
          <Input
            id={name}
            {...{ value, onChange, onBlur }}
            {...inputProps}
            placeholder={inputProps.placeholder}
            className={cn(
              inputProps.className,
              hasError ? "border-red-500 transition duration-500" : "",
            )}
          />
        </div>
      )}
    />
  );
}
