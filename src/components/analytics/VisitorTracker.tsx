"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { recordPageVisitAction } from "@/actions/analytics";

export function VisitorTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string>("");

  useEffect(() => {
    if (pathname && pathname !== lastPath.current && !pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
      lastPath.current = pathname;
      recordPageVisitAction(pathname);
    }
  }, [pathname]);

  return null;
}
