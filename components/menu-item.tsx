import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MenuItem({
  icon,
  title,
  action,
  isActive = null,
}: {
  icon?: ReactNode;
  title?: string;
  action?: () => void;
  isActive?: (() => boolean) | null;
}) {
  return (
    <button
      className={cn(
        "bg-transparent border-none rounded-md text-white cursor-pointer w-8 h-8 mr-1 p-1 hover:text-white hover:bg-[#303030]",
        isActive ? "bg-[#303030]" : "text-[#303030"
      )}
      onClick={action}
      title={title}
    >
      <svg className="remix fill-current h-full w-full">{icon}</svg>
    </button>
  );
}
