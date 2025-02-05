import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Copy } from "lucide-react";
import { Separator } from "./ui/separator";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useWriteNote } from "@/contexts/write-note-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { NoteVisibilityEnum } from "@/types/note";
import { env } from "@/env";

export function ShareNotePopover() {
  const { toast } = useToast();
  const { note, visibility, setVisibility } = useWriteNote();
  const [showLink, setShowLink] = useState(false);

  const handleChangeVisibility = useCallback(
    (value: NoteVisibilityEnum) => {
      setVisibility(value);

      if (["PUBLIC", "READ_ONLY"].includes(value)) {
        setShowLink(true);
      } else {
        setShowLink(false);
      }
    },
    [setVisibility, setShowLink]
  );

  const handleCopyLink = useCallback(() => {
    const noteLink = `${env.NEXT_PUBLIC_API_BASE_URL}/write-note/${note?.id}`;
    navigator.clipboard.writeText(noteLink);

    toast({
      variant: "primary",
      description: "Link copied to clipboard!",
      duration: 3000,
    });
  }, [note?.id, toast]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full sm:w-fit">
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] mr-6">
        <div className="grid gap-4">
          <div className="flex gap-3 items-center justify-between">
            <div className="space-y-2">
              <h4 className="text-lg leading-none">Share your note</h4>
              <p className="text-sm text-muted-foreground">
                Configure sharing options for your note.
              </p>
            </div>
            <Select
              value={visibility.toString()}
              onValueChange={(value) =>
                handleChangeVisibility(value as unknown as NoteVisibilityEnum)
              }
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Invite only" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="PRIVATE">Private</SelectItem>
                  <SelectItem value="PUBLIC">Public</SelectItem>
                  <SelectItem value="READ_ONLY">Read-Only</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {showLink && (
          <>
            <Separator className="my-3" />
            <Button className="w-full" onClick={handleCopyLink}>
              <Copy />
              Copy Link
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
