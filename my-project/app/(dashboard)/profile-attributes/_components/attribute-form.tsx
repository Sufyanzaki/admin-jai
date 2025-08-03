"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useProfileAttributeForm } from "../_hooks/useProfileAttributeForm";
import { Controller } from "react-hook-form";
import { ProfileAttributeResponse } from "../_api/getProfileAttribute";

export default function AttributeForm({ attribute }: { attribute: ProfileAttributeResponse }) {
    const {
      handleSubmit,
      setValue,
      watch,
      control,
      isLoading,
      onSubmit,
      addChip,
      removeChip,
      clearChips,
      values,
      inputValue,
    } = useProfileAttributeForm(attribute);

    const isVisible = watch("isVisible");

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addChip();
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between py-4">
            <Label htmlFor={`show-${attribute.id}`} className="font-medium">
              Show on profile
            </Label>
            <Switch
              id={`show-${attribute.id}`}
              checked={isVisible || false}
              onCheckedChange={(checked) => setValue("isVisible", checked)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Controller
                name="inputValue"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder={`Add ${attribute.label.toLowerCase()} value...`}
                    value={field.value}
                    onChange={field.onChange}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                  />
                )}
              />
              <Button
                onClick={addChip}
                disabled={!inputValue.trim()}
                variant="outline"
                type="button"
              >
                Add
              </Button>
            </div>

            {values.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">
                  Current values:
                </Label>
                <div className="flex flex-wrap gap-2">
                  {values.map((value, index) => (
                    <Badge key={index} variant="secondary">
                      <span className="truncate max-w-[120px]">{value}</span>
                      <button
                        onClick={() => removeChip(value)}
                        className="hover:bg-primary/30 rounded-md p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                        aria-label={`Remove ${value}`}
                        type="button"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
          <Button
            variant="outline"
            onClick={clearChips}
            disabled={values.length === 0}
            className="w-full sm:w-auto"
            type="button"
          >
            Clear All
          </Button>
          <Button className="w-full sm:w-auto" type="submit" disabled={isLoading}>Save Changes</Button>
        </CardFooter>
      </form>
    );
}