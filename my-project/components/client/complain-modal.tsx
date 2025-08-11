import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/client/ux/dialog";
import { Textarea } from "@/components/client/ux/textarea";
import { Button } from "@/components/client/ux/button";
import { AlertTriangle } from "lucide-react";
import { Label } from "@/components/client/ux/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/client/ux/select";
import { useReportProfile } from "@/app/(client)/dashboard/_hooks/useReportProfile";
import { Controller } from "react-hook-form";

export default function ComplainModal({
  openComplain,
  setOpenComplain,
  userId,
}: {
  openComplain: boolean;
  setOpenComplain: (open: boolean) => void;
  userId: number;
}) {
  const {
    handleSubmit,
    onSubmit,
    errors,
    register,
    setValue,
    control,
    isSubmitting,
  } = useReportProfile(userId);
  return (
    <Dialog open={openComplain} onOpenChange={setOpenComplain}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit((values) =>
            onSubmit(values, () => setOpenComplain(false))
          )}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Report Profile
            </DialogTitle>
            <DialogDescription>
              Tell us what&apos;s wrong with this profile
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Report Reason</Label>
                <Controller
                  control={control}
                  name="reason"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fake profile">
                          Fake profile
                        </SelectItem>
                        <SelectItem value="Inappropriate content">
                          Inappropriate content
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.reason && (
                  <p className="text-red-500 text-sm">
                    {errors.reason.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Additional Details</Label>
                <Textarea
                  placeholder="Please provide more details about your report..."
                  className="w-full"
                  rows={4}
                  {...register("additionDetail")}
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-gray-500 mb-4">
              Your report will be kept confidential and reviewed by our team.
              Thank you for helping us maintain a safe community.
            </p>
          </div>

          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setOpenComplain(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="theme"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
