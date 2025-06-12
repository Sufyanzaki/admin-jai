import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Plus} from "lucide-react";

export default function ChatAndVideoSetting() {
  return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Staff Management</h2>
            <p className="text-muted-foreground">Manage your users and their information.</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Update Member</CardTitle>
          </CardHeader>
          <CardContent className="">
            <form className="space-y-4">
              <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <Input id="firstName" className="w-full" placeholder="Enter first name" />
              </div>

              <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
                <Input id="lastName" className="w-full" placeholder="Enter last name" />
              </div>

              <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input id="email" type="email" className="w-full" placeholder="Enter email" />
              </div>

              <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </Label>
                <Input id="phone" type="tel" className="w-full" placeholder="Enter phone" />
              </div>

              <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input id="password" type="password" className="w-full " placeholder="Enter password" />
              </div>

              <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                <Label htmlFor="role" className="text-sm font-medium">
                  Role
                </Label>
                <Input id="role" placeholder="Role" className="w-full" />
              </div>

              <div className="flex justify-end pt-6">
                <Button className="px-8">Update Member</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  )
}