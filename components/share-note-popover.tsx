import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "./ui/switch";
import { Copy } from "lucide-react";
import { Separator } from "./ui/separator";
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useWriteNote } from "@/contexts/write-note-context";

export function ShareNotePopover() {
  const { toast } = useToast();
  const { note, isPublicNote, setIsPublicNote } = useWriteNote();

  const handleCopyLink = useCallback(() => {
    const noteLink = `write-note/${note?.id}`;
    navigator.clipboard.writeText(noteLink);

    toast({
      variant: "primary",
      description: "Link copied to clipboard!",
      duration: 3000,
    });
  }, [toast]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Share</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] mr-6">
        <div className="grid gap-4">
          <div className="flex gap-2 items-center justify-between">
            <div className="space-y-2">
              <h4 className="text-lg leading-none">Share your note</h4>
              <p className="text-sm text-muted-foreground">
                Configure sharing options for your note.
              </p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="mb-5 flex items-center gap-2 justify-between">
              <div className="flex flex-col">
                Allow public viewers
                <p className="text-sm">Anyone with the link can view only</p>
              </div>
              <Switch
                checked={isPublicNote}
                onCheckedChange={(checked) => setIsPublicNote(checked)}
              />
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
