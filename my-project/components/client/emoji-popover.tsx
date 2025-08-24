import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/client/ux/popover";
import { Button } from "@/components/client/ux/button";
import { Smile } from "lucide-react";
import { EmojiPicker } from "@ferrucc-io/emoji-picker";

export function EmojiPopover({
  onEmojiSelect,
}: {
  onEmojiSelect: (emoji: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Smile className="w-5 h-5 text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100dvw] h-[200px] lg:w-[400px] lg:h-[450px] shadow-none border-none p-0">
        <EmojiPicker onEmojiSelect={onEmojiSelect} className="border-none [&_.emoji-picker-emoji]:text-[38px]">
          <EmojiPicker.Header>
            <EmojiPicker.Input placeholder="" className="pl-7 border border-app-border" />
          </EmojiPicker.Header>
          <EmojiPicker.Group className="overflow-y-hidden">
            <EmojiPicker.List />
          </EmojiPicker.Group>
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
}
