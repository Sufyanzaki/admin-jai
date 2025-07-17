"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
  Banknote,
  Plus,
  Settings2,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Save,
  Settings,
  X,
  Building, Trash, Upload, MoreVertical
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import {Switch} from "@/components/ui/switch";
import {Textarea} from "@/components/ui/textarea";
import {MultiSelectCombobox} from "@/components/ui/combo-box";
import AbusiveCard from "./_components/abusive-card";

const currencies = [
  {
    id: "1",
    name: "English",
    code: "eng",
    jsx: <Switch id={`show-`} />
  },
  {
    id: "2",
    name: "Dutch",
    code: "nl",
    jsx: <Switch id={`show-1`} />
  },
];

const pagesData = [
  {
    id: 1,
    name: "Bedrijf",
    pages: ["Home", "Contact", "How Work", "Registration", "Agenda"],
  },
  {
    id: 2,
    name: "Veilig daten",
    pages: ["Agenda"],
  },
  {
    id: 3,
    name: "Legal",
    pages: ["Algemene voorwaarden", "Privacy", "Disclaimer"],
  },
];

const pageOptions = [
  'Home', 'About', 'Contact Us'
]

export default function SettingsPage() {

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openFormatDialog, setOpenFormatDialog] = useState(false);
  const [currencyToDelete, setCurrencyToDelete] = useState(currencies[0]);

  const [openFooterDialog, setOpenFooterDialog] = useState(false);

  const [selectedPage, setSelectedPage] = useState<string[]>([])



  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div>
        <h2 className="text-2xl font-bold">App Settings</h2>
        <p className="text-sm text-muted-foreground">Configure your app settings and preferences</p>
      </div>

      <Tabs defaultValue="currency" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="currency">Currency</TabsTrigger>
          <TabsTrigger value="abusive-words">Abusive Words</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="footer-settings">Footer Section</TabsTrigger>
          <TabsTrigger value="user-dashboard">User Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="currency" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Title & Description */}
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                    <Settings className="h-5 w-5" />
                    Currency Configuration
                  </CardTitle>
                  <CardDescription>
                    Manage your system settings and appearance
                  </CardDescription>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                      variant="outline"
                      onClick={() => setOpenFormatDialog(true)}
                      className="w-full sm:w-auto"
                  >
                    <Settings2 className="mr-2 h-4 w-4" />
                    Set Format
                  </Button>
                  <Button
                      onClick={() => setOpenAddDialog(true)}
                      className="w-full sm:w-auto"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Currency
                  </Button>
                </div>
              </div>
            </CardHeader>


            <CardContent className="p-0">
              <div className="rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[80px]">#</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>RTL</TableHead>
                      <TableHead className="w-[120px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currencies.map((currency) => (
                        <TableRow key={currency.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{currency.id}</TableCell>
                          <TableCell>{currency.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{currency.code}</Badge>
                          </TableCell>
                          <TableCell>
                            {currency.jsx}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 ml-auto">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-[160px]">
                                <DropdownMenuItem onClick={()=> setOpenAddDialog(true)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => setCurrencyToDelete(currency)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="abusive-words" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Abusive Words Configuration
                  </CardTitle>
                  <CardDescription>Manage your system settings and appearance</CardDescription>
                </div>
              </div>
            </CardHeader>

            <AbusiveCard />

          </Card>
        </TabsContent>
        <TabsContent value="footer" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Footer
                  </CardTitle>
                  <CardDescription>Manage your system settings and appearance</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-6">
                {/* First Row: Image Upload & Footer Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Footer Logo</h3>
                    <div className="flex items-center gap-4">
                      <div className="h-24 w-24 shrink-0 rounded-md bg-muted flex items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <input type="file" id="system-logo" className="hidden" />
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() =>
                                document.getElementById("system-logo")?.click()
                            }
                        >
                          Upload Photo
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Upload a profile photo. JPG, PNG or GIF. Max 2MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Description */}
                  <div className="space-y-2">
                    <Label htmlFor="footer-description">Footer Description</Label>
                    <Textarea id="footer-description" placeholder="Enter description" />
                  </div>
                </div>

                {/* Second Row: Remaining Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="link-name">Link Name</Label>
                    <Input id="link-name" placeholder="Enter link name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="search-name">Search Name</Label>
                    <Input id="search-name" placeholder="Enter search name" />
                  </div>

                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <Label htmlFor="footer-content">Footer Content</Label>
                    <Input id="footer-content" placeholder="Enter footer content" />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button className="px-8">Save Template</Button>
                </div>
              </form>
            </CardContent>

          </Card>
        </TabsContent>
        <TabsContent value="footer-settings" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Title + Description */}
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                    <Settings className="h-5 w-5" />
                    Footer Section
                  </CardTitle>
                  <CardDescription>
                    Manage your system settings and appearance
                  </CardDescription>
                </div>

                {/* Button */}
                <Button
                    onClick={() => setOpenFooterDialog(true)}
                    className="w-full sm:w-auto"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
              </div>
            </CardHeader>
            <div className="px-4 space-y-6 pb-6">
              <div className="py-3 md:py-4 xxl:py-6">
                <Table className="whitespace-nowrap">
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Pages</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagesData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.pages.join(", ")}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => setOpenFooterDialog(true)}
                                >
                                  <Pencil className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Trash className="w-4 h-4 mr-2 text-red-500" />
                                  <span className="text-red-500">Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>

        </TabsContent>
        <TabsContent value="user-dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                User Dashboard Footer Section
              </CardTitle>
              <CardDescription>
                Customize the footer content shown on the user dashboard, including links, contact info, and disclaimers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="known-languages" className="text-base font-medium">
                  Section Page
                </Label>
                <MultiSelectCombobox options={pageOptions} selected={selectedPage} onChange={setSelectedPage} />
              </div>
              <div className="flex justify-end pt-6">
                <Button className="px-8">Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Currency</DialogTitle>
            <DialogDescription>
              Add a new currency to your system
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Currency Name *</Label>
                <Input id="name" placeholder="e.g. US Dollar" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Currency Code *</Label>
                <Input id="code" placeholder="e.g. USD" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">Symbol *</Label>
                <Input id="symbol" placeholder="e.g. $" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rtl">Text Direction</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ltr">Left-to-Right (LTR)</SelectItem>
                    <SelectItem value="rtl">Right-to-Left (RTL)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Currency
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Set Format Dialog */}
      <Dialog open={openFormatDialog} onOpenChange={setOpenFormatDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Currency Format Settings</DialogTitle>
            <DialogDescription>
              Configure how currency values are displayed
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="default">Default Currency *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select default currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                      <SelectItem key={currency.id} value={currency.id}>
                        {currency.name} ({currency.code})
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="symbol-format">Symbol Format</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prefix">Prefix ($100)</SelectItem>
                    <SelectItem value="suffix">Suffix (100$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="decimal-separator">Decimal Separator</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select separator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=".">Period (.)</SelectItem>
                    <SelectItem value=",">Comma (,)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="decimals">Decimal Places</Label>
                <Input id="decimals" type="number" min="0" max="4" defaultValue="2" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenFormatDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Format
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openFooterDialog} onOpenChange={setOpenFooterDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Footer Section</DialogTitle>
            <DialogDescription>
              Provide the name and page associated with this section.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="section-name">Section Name</Label>
              <Input id="section-name" placeholder="Enter name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-page">Section Page</Label>
              <Input id="section-page" placeholder="Enter page" />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button type="submit">Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
