"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { Header } from "../_components/containers/header";

export function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return children;
  }

  return (
    <div className="relative flex flex-col">
      <Header />
      <div className="h-12 sm:h-14" />
      {children}
    </div>
  );
}
