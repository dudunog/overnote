"use client";

import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function AppBreadcrumb() {
  const pathname = usePathname();

  const currentItem = SIDEBAR_ITEMS.find((item) => item.url === pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {currentItem && (
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage>{currentItem.title}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
