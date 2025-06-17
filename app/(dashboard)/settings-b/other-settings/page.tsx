"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Switch} from "@/components/ui/switch"
import {Building} from "lucide-react"
import TipTapEditor from "@/components/editor/TipTapEditor";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Link from "next/link";
import { Languages, Plus, Eye, Pencil, Trash2, Upload, Save, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

const languages = [
  {
    id: 1,
    name: "English",
    code: "eng",
    flag: "🇬🇧",
  },
  {
    id: 2,
    name: "Dutch",
    code: "nl",
    flag: "🇳🇱",
  },
];


const langaugeTabs = [
  { id: "all", title: "All"},
  { id: "add_name", title: "Add New"},
  { id: "default", title: "Default"}
]


export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">General Settings</h2>
        <p className="text-sm text-muted-foreground">Configure your clinic settings and preferences</p>
      </div>

      <Tabs defaultValue="clinic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="basic">Language</TabsTrigger>
          <TabsTrigger value="preferences">Currency</TabsTrigger>
          <TabsTrigger value="system">Abusive Words</TabsTrigger>
          <TabsTrigger value="cookies">Footer</TabsTrigger>
          <TabsTrigger value="seo-settings">Footer Section</TabsTrigger>
          <TabsTrigger value="seo-settings">User Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center">
                <Languages className="mr-3 h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Language Settings</CardTitle>
                  <CardDescription>Manage system languages and translations</CardDescription>
                </div>
              </div>
            </CardHeader>

            <Tabs defaultValue="all" className="px-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-4">
                <TabsList className="w-full sm:w-auto">
                  {langaugeTabs.map((language) => (
                      <TabsTrigger
                          key={language.id}
                          value={language.id}
                          className="px-4 py-2 data-[state=active]:bg-primary/10"
                      >
                        {language.title}
                      </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Flag</TableHead>
                        <TableHead className="w-[120px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {languages.map((language) => (
                          <TableRow key={language.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{language.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                {language.flag && (
                                    <span className="text-lg">{language.flag}</span>
                                )}
                                <span>{language.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{language.code}</Badge>
                            </TableCell>
                            <TableCell>
                              {language.flag || "—"}
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
                                  <DropdownMenuItem asChild>
                                    <Link href={`/settings/languages/${language.id}`} className="flex items-center">
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/settings/languages/${language.id}/edit`} className="flex items-center">
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
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
              </TabsContent>

              <TabsContent value="add_name" className="mt-0">
                <Card className="border-0 shadow-none">
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="language-name">Language Name *</Label>
                        <Input id="language-name" placeholder="e.g. Spanish" />
                        <p className="text-sm text-muted-foreground">
                          The display name for the language
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language-code">Language Code *</Label>
                        <Input id="language-code" placeholder="e.g. es" />
                        <p className="text-sm text-muted-foreground">
                          2-letter ISO code (en, es, fr, etc.)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Flag Image</Label>
                      <div className="flex items-center gap-6">
                        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                          <Image
                              src="/placeholder-flag.jpg"
                              alt="Flag preview"
                              width={96}
                              height={96}
                              className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <Input
                              type="file"
                              id="flag-upload"
                              accept="image/*"
                              className="hidden"
                          />
                          <Button
                              variant="outline"
                              type="button"
                              onClick={() => document.getElementById('flag-upload')?.click()}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Flag
                          </Button>
                          <p className="text-sm text-muted-foreground">
                            Recommended: 64×64 PNG with transparent background
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline" asChild>
                        <Link href="/settings/languages">
                          Cancel
                        </Link>
                      </Button>
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Language
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="default" className="mt-0">
                <Card className="border-0 shadow-none">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <Label className="text-base">Default Language Settings</Label>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <p className="font-medium">Set as Default Language</p>
                          <p className="text-sm text-muted-foreground">
                            This will be the primary language for your system
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline" asChild>
                        <Link href="/settings/languages">
                          Cancel
                        </Link>
                      </Button>
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </TabsContent>
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Preferences
              </CardTitle>
              <CardDescription>Update your clinic's basic information and contact details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="use-insurance">Maintenance Mode Activation</Label>
                <Switch id="use-insurance" defaultChecked />
              </div>

              <div className="flex justify-end pt-6">
                <Button className="px-8">Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                System Settings
              </CardTitle>
              <CardDescription>
                Overview of your server configuration and PHP settings.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Server Information */}
              <div className="border rounded-xl p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Server Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>- PHP Version</span>
                    <span>8.3.21</span>
                  </div>
                  <div className="flex justify-between">
                    <span>- MySQL Version</span>
                    <span>10.6.22-MariaDB</span>
                  </div>
                </div>
              </div>

              {/* PHP.ini Config */}
              <div className="border rounded-xl p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">php.ini Config</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>- File Uploads</span>
                    <span>Enabled</span>
                  </div>
                  <div className="flex justify-between">
                    <span>- Max File Uploads</span>
                    <span>20</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cookies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Cookies
              </CardTitle>
              <CardDescription>Update your clinic's basic information and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

              <form className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="use-insurance">Show cookie Agreement</Label>
                  <Switch id="use-insurance" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="first-name">SITE KEY</Label>
                  <Input id="first-name" placeholder="Enter subject" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="first-name">Cookie Agreement Text</Label>
                  <TipTapEditor />
                </div>

                <div className="flex justify-end pt-6">
                  <Button className="px-8">Save Template</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seo-settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Seo Settings
              </CardTitle>
              <CardDescription>Update your clinic's basic information and contact details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <form className="grid gap-6 w-full">
                {/* Meta Title */}
                <div className="grid gap-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input id="metaTitle" name="metaTitle" placeholder="Humsafar - Home" />
                </div>

                {/* Meta Description */}
                <div className="grid gap-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea id="metaDescription" name="metaDescription" placeholder="Humsafar - Home" />
                </div>

                {/* Keywords */}
                <div className="grid gap-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Textarea
                      id="keywords"
                      name="keywords"
                      placeholder="Humsafar,"
                      className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">Separate with commas</p>
                </div>

                {/* Meta Image */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Meta Image</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 shrink-0 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <input type="file" id="system-logo" className="hidden" />
                      <Button variant="outline" onClick={() => document.getElementById("system-logo")?.click()}>Upload Photo</Button>
                      <p className="text-sm text-muted-foreground">Upload a profile photo. JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button className="px-8">Save Configuration</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
