import { cn } from "@/app/_libs/classnames";
import { HTMLAttributes, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type Props = {
  content: string;
} & Pick<HTMLAttributes<HTMLButtonElement>, "className">;

export function EllipsisText({ content, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen} delayDuration={0}>
        <TooltipTrigger
          onClick={() => setOpen(!open)}
          className={cn("max-w-fit truncate text-left", className)}
        >
          {content}
        </TooltipTrigger>
        <TooltipContent className="max-w-60">
          <span>{content}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
