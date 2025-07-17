import useAbusiveWordsForm from "../_hooks/usePostAbusiveWords";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";

export default function AbusiveCard() {
  const {
    abusiveWords,
    addChip,
    removeChip,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
  } = useAbusiveWordsForm();

  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        addChip(inputValue);
        setInputValue("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <CardContent className="p-0">
      <div>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add value..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => {
                if (inputValue.trim()) {
                  addChip(inputValue);
                  setInputValue("");
                }
              }}
              disabled={!inputValue.trim()}
              variant="outline"
            >
              Add
            </Button>
    
          </div>
          {errors.words && (
            <div className="text-red-500 text-sm">{errors.words.message}</div>
          )}
          {abusiveWords.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-muted-foreground">
                Current values:
              </Label>
              <div className="flex flex-wrap gap-2">
                {abusiveWords.map((value, index) => (
                  <Badge key={index} variant="destructive">
                    <span className="truncate max-w-[120px]">{value}</span>
                    <button
                      type="button"
                      onClick={() => removeChip(value)}
                      className="hover:bg-primary/30 rounded-md p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                      aria-label={`Remove ${value}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </CardContent>
    <CardFooter className="justify-end">
        <Button type="submit"
              disabled={abusiveWords.length === 0 || isLoading}
              className="px-8"
              variant="default"
            >
              {isLoading ? "Saving..." : "Save Configuration"}
              </Button>
    </CardFooter>
    </form>
  );
}