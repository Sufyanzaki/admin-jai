import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/client/ux/dialog";
import { Textarea } from "@/components/client/ux/textarea";
import { Button } from "@/components/client/ux/button";
import { AlertTriangle } from "lucide-react";
import {Label} from "@/components/client/ux/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/client/ux/select";

export default function ComplainModal({
  openComplain, 
  setOpenComplain
}: { 
  openComplain: boolean, 
  setOpenComplain: (open: boolean) => void
}) {
    return (
        <Dialog open={openComplain} onOpenChange={setOpenComplain}>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
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
                            <Select>
                                <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Reason" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="a">Fake profile</SelectItem>
                                    <SelectItem value="b">Inappropriate content</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label>Additional Details</Label>
                            <Textarea
                                placeholder="Please provide more details about your report..."
                                className="w-full"
                                rows={4}
                            />
                        </div>
                    </div>
                </div>
                <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-4">
                        Your report will be kept confidential and reviewed by our team. Thank you for helping us maintain a safe community.
                    </p>
                </div>

                <DialogFooter className="flex gap-2 sm:justify-end">
                    <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => setOpenComplain(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        variant="theme"
                    >
                        Submit Report
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}