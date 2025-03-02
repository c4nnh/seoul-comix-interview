import { cn } from "@/app/_libs/classnames";
import * as React from "react";
import { IconChevronLeft } from "../icons/chevron-left";
import { IconChevronRight } from "../icons/chevron-right";
import { IconChevronsLeft } from "../icons/chevrons-left";
import { IconChevronsRight } from "../icons/chevrons-right";
import { IconDots } from "../icons/dots";
import { Button, type ButtonProps } from "./button";

const PaginationRoot = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
PaginationRoot.displayName = "PaginationRoot";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationButtonProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"button">;

const PaginationButton = ({
  className,
  isActive,
  ...props
}: PaginationButtonProps) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    size="icon"
    variant={isActive ? "outline" : "ghost"}
    className={cn(isActive ? "border-primary" : "", "", className)}
    {...props}
  />
);
PaginationButton.displayName = "PaginationButton";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to previous page"
    size="default"
    className={cn("px-3", className)}
    {...props}
  >
    <IconChevronLeft className="h-4 w-4" />
  </PaginationButton>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationFirst = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to the first page"
    size="default"
    className={cn("px-3", className)}
    {...props}
  >
    <IconChevronsLeft className="h-4 w-4" />
  </PaginationButton>
);
PaginationFirst.displayName = "PaginationFirst";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to previous page"
    size="default"
    className={cn("px-3", className)}
    {...props}
  >
    <IconChevronRight className="h-4 w-4" />
  </PaginationButton>
);
PaginationNext.displayName = "PaginationNext";

const PaginationLast = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to the last page"
    size="default"
    className={cn("px-3", className)}
    {...props}
  >
    <IconChevronsRight className="h-4 w-4" />
  </PaginationButton>
);
PaginationLast.displayName = "PaginationLast";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <IconDots className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
  PaginationRoot,
};
