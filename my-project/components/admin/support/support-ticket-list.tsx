"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {Badge} from "@/components/admin/ui/badge"
import {Button} from "@/components/admin/ui/button"
import {Input} from "@/components/admin/ui/input"
import {Eye, MessageSquare, Search} from "lucide-react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/admin/ui/table"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/admin/ui/dialog"
import {useSupportTickets} from "@/app/admin/(dashboard)/support/_hooks/useSupportTickets"
import {AdminSupportTicketDto, ReplyDto} from "@/app/(client)/dashboard/settings/support/_types/support";
import ReplyForm from "./ReplyForm"

export function SupportTicketList() {
  const { supportTickets, ticketsLoading } = useSupportTickets()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<AdminSupportTicketDto | null>(null)

  const filteredTickets = supportTickets?.filter((ticket) =>
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toString().includes(searchQuery.toLowerCase())
  ) || []

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
              Open
            </Badge>
        )
      case "in-progress":
        return (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
              In Progress
            </Badge>
        )
      case "resolved":
        return (
            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
              Resolved
            </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
            <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">
              Low
            </Badge>
        )
      case "medium":
        return (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
              Medium
            </Badge>
        )
      case "high":
        return (
            <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200">
              High
            </Badge>
        )
      case "urgent":
        return (
            <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
              Urgent
            </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    if(!dateString) return;
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (ticketsLoading) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <p className="text-sm">Loading tickets...</p>
        </div>
    )
  }

  return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>View and manage support tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search tickets..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {filteredTickets.length > 0 ? (
                <div className="rounded-md border">
                  <Table className="whitespace-nowrap">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket ID</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead className="hidden md:table-cell">Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTickets.map((ticket) => (
                          <TableRow key={ticket.id}>
                            <TableCell className="font-medium">#{ticket.id}</TableCell>
                            <TableCell className="hidden md:table-cell">{formatDate(ticket.createdAt)}</TableCell>
                            <TableCell>{ticket.subject}</TableCell>
                            <TableCell className="hidden md:table-cell">{getPriorityBadge(ticket.priority)}</TableCell>
                            <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => setSelectedTicket(ticket)}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View ticket</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setSelectedTicket(ticket)
                                    }}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  <span className="sr-only">Reply to ticket</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
            ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No tickets found</p>
                </div>
            )}
          </CardContent>
        </Card>

        {/* Ticket Details Dialog */}
        <Dialog open={selectedTicket !== null} onOpenChange={(open) => !open && setSelectedTicket(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Ticket #{selectedTicket?.id} - {selectedTicket?.subject}
              </DialogTitle>
              <DialogDescription>
                Created by {selectedTicket?.user?.firstName} {selectedTicket?.user?.lastName} on {selectedTicket && formatDate(selectedTicket.createdAt)}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <p className="text-sm font-medium">Status</p>
                <div>{selectedTicket && getStatusBadge(selectedTicket.status)}</div>
              </div>
              <div>
                <p className="text-sm font-medium">Priority</p>
                <p>{selectedTicket && getPriorityBadge(selectedTicket.priority)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Category</p>
                <p className="capitalize">{selectedTicket?.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p>{selectedTicket && formatDate(selectedTicket.updatedAt)}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">Description</p>
              <p className="text-sm">{selectedTicket?.description}</p>
            </div>

            {selectedTicket?.replies && selectedTicket.replies.length > 0 && (
                <div className="border-t pt-4">
                  <p className="text-sm font-medium mb-2">Responses</p>
                  <div className="space-y-4">
                    {selectedTicket.replies.map((response: ReplyDto) => (
                        <div key={response.id} className="bg-muted p-3 rounded-md">
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">{response.user?.firstName}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(response.updatedAt)}</p>
                          </div>
                          <p className="text-sm">{response.message}</p>
                        </div>
                    ))}
                  </div>
                </div>
            )}

            <ReplyForm selectedTicket={selectedTicket} setSelectedTicket={setSelectedTicket}/>
          </DialogContent>
        </Dialog>
      </>
  )
}