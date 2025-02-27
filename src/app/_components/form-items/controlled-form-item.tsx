import { useTranslator } from "@/app/_hooks/use-translator";
import { cn } from "@/app/_libs/classnames";
import { PropsWithChildren, ReactNode, type HTMLAttributes } from "react";
import {
  Controller,
  useFormContext,
  type ControllerProps,
  type ControllerRenderProps,
} from "react-hook-form";

export type ControlledFormItemProps = PropsWithChildren<
  {
    name: string;
    render: (
      props: Pick<ControllerRenderProps, "value" | "onChange" | "onBlur">,
    ) => ReactNode;
  } & Omit<ControllerProps, "render"> & {
      className?: HTMLAttributes<HTMLDivElement>["className"];
    }
>;

export function ControlledFormItem({
  name,
  className,
  render,
  ...props
}: ControlledFormItemProps) {
  const { control } = useFormContext();
  const { translate } = useTranslator();

  return (
    <Controller
      control={control}
      name={name}
      {...props}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        const message = translate(error?.message);
        const hasError = !!message;

        return (
          <div className={cn("flex flex-col", className)}>
            {render({ value, onChange, onBlur })}
            <p
              className={cn(
                "text-xs text-red-500 transition duration-500",
                hasError ? "opacity-100" : "opacity-0",
              )}
            >
              {message}
            </p>
            {!hasError && <p className="text-xs">&nbsp;</p>}
          </div>
        );
      }}
    />
  );
}
