import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback } from "react";
import { useWriteNote } from "@/contexts/write-note-context";
import { COLORS } from "@/lib/colors";

export function SelectColorPopover() {
  const { setColor } = useWriteNote();

  const handleSelectColor = useCallback(
    (color: string) => {
      setColor(color);
    },
    [setColor]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full sm:w-fit">
          Select color
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[370px] mr-6">
        <div className="grid grid-cols-8 gap-3">
          {" "}
          {Object.values(COLORS).map((color) => (
            <div
              key={color}
              className="w-10 h-10 rounded-md cursor-pointer"
              onClick={() => handleSelectColor(color)}
              style={{ backgroundColor: color }}
            />
          ))}{" "}
        </div>
      </PopoverContent>
    </Popover>
  );
}
