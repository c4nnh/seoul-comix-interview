import { cn } from "@/app/_libs/classnames";
import { useTranslations } from "next-intl";
import { HTMLAttributes } from "react";
import { IconEmptyBox } from "../icons/empty-box";

type Props = Pick<HTMLAttributes<HTMLDivElement>, "className">;

export function NoData({ className }: Props) {
  const t = useTranslations();

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-1 text-gray-500",
        className,
      )}
    >
      <IconEmptyBox className="h-20 w-20" />
      <span className="text-2xl font-bold">{t("common.noData")}</span>
    </div>
  );
}
