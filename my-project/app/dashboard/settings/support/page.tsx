import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/client/ux/select";
import { Textarea } from "@/components/client/ux/textarea";
import { Label } from "@/components/client/ux/label";
import { X } from "lucide-react";

export default function SupportTicketPage() {
    return (
        <div className="space-y-5">
            <div className="bg-yellow-50 border border-yellow-300 rounded-[5px] p-4">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-yellow-800">
                        ⚠️ Warning: Please ensure all information is accurate before saving.
                    </p>
                    <Button variant="ghost" size="sm" className="text-yellow-600 hover:bg-yellow-100">
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div>
                <Label>Subject</Label>
                <Input placeholder="Brief description of the issue" className="h-12" />
            </div>

            <div>
                <Label>Category</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="bug">Bug</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="account">Account</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Priority</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Description</Label>
                <Textarea placeholder="Please provide detailed information about your issue" className="min-h-[100px]" />
            </div>

            <div className="flex justify-end gap-3">
                <Button variant="outline" size="lg">
                    Cancel
                </Button>
                <Button variant="theme" size="lg">
                    Submit Ticket
                </Button>
            </div>
        </div>
    );
}
