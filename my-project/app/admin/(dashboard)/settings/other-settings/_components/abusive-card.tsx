import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import { CardContent, CardFooter } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { X } from "lucide-react";
import { useState } from "react";
import Preloader from "@/components/shared/Preloader";
import useAbusiveWordsForm from "@/app/admin/(dashboard)/settings/other-settings/_hooks/usePatchAbusiveWords";
import { useTranslation } from "react-i18next";

type Props = {
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
};

export default function AbusiveCard({ canEdit, canDelete, canCreate }: Props) {
  const { t } = useTranslation();
  const {
    abusiveWords,
    addChip,
    removeChip,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    wordLoading,
  } = useAbusiveWordsForm();

  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() && canCreate) {
        addChip(inputValue);
        setInputValue("");
      }
    }
  };

  const chips = abusiveWords
      ? abusiveWords.split(",").map((w) => w.trim()).filter(Boolean)
      : [];

  if (wordLoading) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">{t("Loading Words")}</p>
        </div>
    );
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="p-0">
          <div className="space-y-4">
            {/* Create new abusive word */}
            {canCreate && (
                <div className="flex gap-2">
                  <Input
                      placeholder={t("Add value...")}
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
                    {t("Add")}
                  </Button>
                </div>
            )}

            {errors.word && (
                <div className="text-red-500 text-sm">{errors.word.message}</div>
            )}

            {/* Show existing abusive words */}
            {chips.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-muted-foreground">
                    {t("Current values:")}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {chips.map((value, index) => (
                        <Badge key={index} variant="destructive">
                          <span className="truncate max-w-[120px]">{value}</span>
                          {canDelete && (
                              <button
                                  type="button"
                                  onClick={() => removeChip(value)}
                                  className="hover:bg-primary/30 rounded-md p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                                  aria-label={t(`Remove ${value}`)}
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                          )}
                        </Badge>
                    ))}
                  </div>
                </div>
            )}
          </div>
        </CardContent>

        {/* Save configuration */}
        {canEdit && (
            <CardFooter className="justify-end">
              <Button
                  type="submit"
                  disabled={chips.length === 0 || isLoading}
                  className="px-8"
                  variant="default"
              >
                {isLoading ? t("Saving...") : t("Save Configuration")}
              </Button>
            </CardFooter>
        )}
      </form>
  );
}
