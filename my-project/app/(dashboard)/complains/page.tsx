"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {MoreHorizontal, Search} from "lucide-react";
import {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea";

const reports = [
  {
    id: 1,
    reportedBy: "Ayesha Khan",
    reportedUser: "Talha Khalid",
    reason: "sss",
    status: "Unblocked",
  },
  {
    id: 2,
    reportedBy: "Ali Raza",
    reportedUser: "Usman Tariq",
    reason: "Spam content",
    status: "Blocked",
  }]

export default function PrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openComplain, setOpenComplain] = useState(false);
  return (
    <div className="flex flex-col gap-5 p-4 xl:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Complaints</h1>
          <p className="text-muted-foreground">Manage patient prescriptions and medications.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>Complain List</CardTitle>
            <CardDescription>View and manage all patient prescriptions.</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search prescriptions..." className="pl-8 w-full md:w-[250px]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Reported User</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.reportedBy}</TableCell>
                    <TableCell>{report.reportedUser}</TableCell>
                    <TableCell>{report.reason}</TableCell>
                    <TableCell>
                      <Badge
                          variant={report.status === "Unblocked" ? "secondary" : "destructive"}
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={()=>setOpenComplain(true)}>View Complaint</DropdownMenuItem>
                          <DropdownMenuItem>Block User</DropdownMenuItem>
                          <DropdownMenuItem>Dismiss Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={openComplain} onOpenChange={setOpenComplain}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Complaint #4567 - Delayed Service
            </DialogTitle>
            <DialogDescription>Submitted on June 10, 2025</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className="text-sm font-semibold text-green-600">Resolved</p>
            </div>
            <div>
              <p className="text-sm font-medium">Priority</p>
              <p className="text-sm font-semibold text-yellow-600">Medium</p>
            </div>
            <div>
              <p className="text-sm font-medium">Category</p>
              <p className="text-sm capitalize">Service Issue</p>
            </div>
            <div>
              <p className="text-sm font-medium">Last Updated</p>
              <p className="text-sm">June 12, 2025</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Complaint Details</p>
            <p className="text-sm">
              I experienced a delay in receiving the service I booked on the platform.
              The technician arrived two hours late without prior notice. I would like
              an explanation and assurance that this won’t happen again.
            </p>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Responses</p>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium">Support Team</p>
                  <p className="text-xs text-muted-foreground">June 11, 2025</p>
                </div>
                <p className="text-sm">
                  Thank you for bringing this to our attention. We apologize for the
                  inconvenience caused and will ensure better service in the future.
                </p>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium">Customer</p>
                  <p className="text-xs text-muted-foreground">June 11, 2025</p>
                </div>
                <p className="text-sm">
                  I appreciate the quick response. Please make sure this doesn’t happen again.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Reply</p>
            <Textarea
                placeholder="Type your reply here..."
                value=""
                onChange={() => {}}
                rows={4}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-4">
            <div className="flex gap-2">
              <Button variant="destructive" onClick={() => {}}>Block User</Button>
              <Button variant="secondary" onClick={() => {}}>Dismiss Report</Button>
            </div>
            <DialogFooter className="flex gap-2 sm:justify-end sm:flex-row">
              <Button variant="outline" onClick={() => {}}>Close</Button>
              <Button disabled>Send Reply</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
