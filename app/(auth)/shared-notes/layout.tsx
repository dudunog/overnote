import { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Overnote | Shared Notes",
};

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return <>{children}</>;
}
