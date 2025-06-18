"use client";

import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export function FAQModal({ isOpen, onClose }: any) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader className="px-1">
                    <DialogTitle>Add FAQ</DialogTitle>
                    <DialogDescription>Frequently Asked Questions</DialogDescription>
                </DialogHeader>
                <div className="max-h-[400px] overflow-y-auto px-1">
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="subject">Question</Label>
                            <Input
                                id="subject"
                                name="subject"
                                placeholder="Brief description of the issue"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select required>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="technical">Technical Issue</SelectItem>
                                    <SelectItem value="billing">Billing Question</SelectItem>
                                    <SelectItem value="account">Account Management</SelectItem>
                                    <SelectItem value="feature">Feature Request</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Answer</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Please provide detailed information about your issue"
                                rows={5}
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" type="button" onClick={()=>onClose(false)}>Cancel</Button>
                            <Button>Submit</Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function CategoryModal({ isOpen, onClose }: any) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader className="px-1">
                    <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <div className="max-h-[400px] overflow-y-auto px-1">
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="categoryName">Category Name</Label>
                            <Input
                                id="categoryName"
                                name="categoryName"
                                placeholder="Category Name"
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" type="button" onClick={()=>onClose(false)}>Cancel</Button>
                            <Button>Submit</Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}