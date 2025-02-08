"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ViewNotesLinkProps {
  linkText: string;
  url: string;
}

export default function ViewNotesLink({ linkText, url }: ViewNotesLinkProps) {
  const router = useRouter();

  const handleGoToNotesPage = useCallback(() => {
    router.push(url);
  }, [router, url]);

  return (
    <Button
      variant="link"
      size="icon"
      className="w-fit h-fit"
      onClick={handleGoToNotesPage}
    >
      {linkText}
    </Button>
  );
}
