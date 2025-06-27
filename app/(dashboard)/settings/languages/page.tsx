"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function LanguagesManagementPage() {
    const languages = [
        {
            name: "English",
            code: "en",
            status: "Active",
            image: "/flags/en.png",
        },
        {
            name: "Spanish",
            code: "es",
            status: "Active",
            image: "/flags/es.png",
        },
        {
            name: "French",
            code: "fr",
            status: "Active",
            image: "/flags/fr.png",
        },
        {
            name: "German",
            code: "de",
            status: "Inactive",
            image: "/flags/de.png",
        },
        {
            name: "Italian",
            code: "it",
            status: "Active",
            image: "/flags/it.png",
        },
    ]
    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div>
                <h2 className="text-2xl font-bold">Languages Management</h2>
                <p className="text-sm text-muted-foreground">Manage available languages for your application</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>All Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Name</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {languages.map((language) => (
                                    <TableRow key={language.code}>
                                        <TableCell className="flex items-center gap-3 font-medium">
                                            {language.name}
                                        </TableCell>
                                        <TableCell className="uppercase">{language.code}</TableCell>
                                        <TableCell>
                                          <span
                                              className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
                                                  language.status === "Active"
                                                      ? "bg-green-100 text-green-800"
                                                      : "bg-gray-100 text-gray-800"
                                              }`}
                                          >
                                            {language.status}
                                          </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Link href="/settings/languages/1">Translate Language</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">
                                                        {language.status === "Active" ? "Deactivate" : "Activate"}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Create Language</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="e.g. English" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="code">Code</Label>
                                <Input id="code" placeholder="e.g. en" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button variant="outline">Cancel</Button>
                                <Button>Create Language</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}