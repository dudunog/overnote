import { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Overnote | Login",
};

export default async function Layout({
  children,
}: Readonly<PropsWithChildren>) {
  return <>{children}</>;
}
