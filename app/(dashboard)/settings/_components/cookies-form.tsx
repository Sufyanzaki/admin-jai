import { Controller } from "react-hook-form";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import useCookieSettingsForm from "../_hooks/useCookieSettingsForm"; // adjust path if needed

export default function CookiesForm() {
  const {
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    setValue,
    control,
    watch,
  } = useCookieSettingsForm();

  const showAgreement = watch("showAgreement");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="showAgreement">Show cookie agreement</Label>
        <Switch
          id="showAgreement"
          checked={showAgreement}
          onCheckedChange={(checked) => setValue("showAgreement", checked)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cookieText">Cookie Agreement Text</Label>
        <Controller
          name="cookieText"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <SimpleEditor
                existingValue={field.value}
                onChange={field.onChange}
              />
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit" className="px-8" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Template"}
        </Button>
      </div>
    </form>
  );
}
