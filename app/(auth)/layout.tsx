import type { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import AppBreadcrumb from "@/components/app-breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overnote | Dashboard",
};

export default async function AuthLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AppBreadcrumb />
          </div>
        </header>

        {children}

        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
