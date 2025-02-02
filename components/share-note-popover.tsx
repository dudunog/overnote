import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Copy } from "lucide-react";
import { Separator } from "./ui/separator";
import { useCallback } from "react";
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

export function ShareNotePopover() {
  const { toast } = useToast();
  const { note, visibility, setVisibility } = useWriteNote();

  const handleChangeVisibility = useCallback(
    (value: NoteVisibilityEnum) => {
      setVisibility(value);
    },
    [setVisibility]
  );

  const handleCopyLink = useCallback(() => {
    const noteLink = `write-note/${note?.id}`;
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
        <Button variant="outline">Share</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[370px] mr-6">
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
                  <SelectItem value="PRIVATE">Privado</SelectItem>
                  <SelectItem value="PUBLIC">Public</SelectItem>
                  <SelectItem value="READ_ONLY">Read-Only Access</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="mb-5 flex items-center gap-2 justify-between">
              <div className="flex flex-col">
                Allow public viewers
                <p className="text-sm">Anyone with the link can view only</p>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full" onClick={handleCopyLink}>
          <Copy />
          Copy Link
        </Button>
      </PopoverContent>
    </Popover>
  );
}
