"use client"

import {
  Bell,
  Building,
  Cookie,
  CreditCard,
  DollarSign,
  Languages,
  Layers,
  Layout,
  LayoutDashboard,
  LogIn,
  Mail,
  Monitor,
  Pencil,
  Puzzle,
  Search,
  Send,
  Settings,
  ShieldBan,
  Sliders,
  Trash,
  Upload,
  Users
} from "lucide-react";
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useState} from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Switch} from "@/components/ui/switch";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Link from "next/link";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

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

const currencies = [
  {
    id: 1,
    name: "English",
    code: "eng",
    jsx: <Switch id={`show-`} />
  },
  {
    id: 2,
    name: "Dutch",
    code: "nl",
    jsx: <Switch id={`show-1`} />
  },
];

const paymentMethods = [
    {
      id: 'mollie',
      title: "Mollie",
    },
    {
      id: 'stripe',
      title: "Stripe",
    }
]

const settingsOptions = [
  { id: "general_settings", title: "General Settings", icon: Settings },
  { id: "preferences", title: "Preferences", icon: Sliders },
  { id: "seo_settings", title: "SEO Settings", icon: Search },
  { id: "language", title: "Language", icon: Languages },
  { id: "currency", title: "Currency", icon: DollarSign },
  { id: "payment_methods", title: "Payment Methods", icon: CreditCard },
  { id: "smtp_settings", title: "SMTP Settings", icon: Send },
  { id: "email_templates", title: "Email Templates", icon: Mail },
  { id: "third_party_settings", title: "Third Party Settings", icon: Puzzle },
  { id: "cookie", title: "Cookie", icon: Cookie },
  { id: "social_media_login", title: "Social Media Login", icon: LogIn },
  { id: "abuse_word_filtering", title: "Abuse Word Filtering", icon: ShieldBan },
  { id: "push_notification", title: "Push Notification", icon: Bell },
  { id: "staffs", title: "Staffs", icon: Users },
  { id: "system", title: "System", icon: Monitor },
  { id: "footer", title: "Footer", icon: Layout },
  { id: "footer_section", title: "Footer Section", icon: Layers },
  { id: "user_dashboard_footer_section", title: "User Dashboard Footer Section", icon: LayoutDashboard },
];

const langaugeTabs = [
  { id: "all", title: "All"},
  { id: "add_name", title: "Add New"},
  { id: "default", title: "Default"}
]

const currencyTabs = [
  { id: "all", title: "All"},
  { id: "add_name", title: "Add New"},
  { id: "default", title: "Default"},
  { id: "set_format", title: "Set Format"}
]

const smtpTabs = [
  { id: "setting", title: "Setting"},
  { id: "test", title: "Test"},
  { id: "instructions", title: "Instructions"},
]


export default function SettingsPage() {

  const [systemName, setSystemName] = useState("Humsafar")
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY")
  const [memberCodePrefix, setMemberCodePrefix] = useState("M")
  const [adminPageTitle, setAdminPageTitle] = useState("Amsterdam")
  const [adminPageParagraph, setAdminPageParagraph] = useState("")
  const [memberMinimumAge, setMemberMinimumAge] = useState("18")

  const dateFormatOptions = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD", "DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD"]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">General Settings</h2>
        <p className="text-sm text-muted-foreground">Configure your clinic settings and preferences</p>
      </div>

      <Tabs defaultValue="general_settings" className="flex gap-4 flex-wrap sm:flex-nowrap">

        <div>
          <TabsList className="flex sm:flex-col h-fit w-full sm:w-fit">
            {settingsOptions.map((setting) => (
                <TabsTrigger key={setting.id} value={setting.id} className="p-3 w-full justify-start flex items-center gap-2">
                  <setting.icon className="w-4 h-4" />
                  {setting.title}
                </TabsTrigger>
            ))}

          </TabsList>
        </div>

        <div className="grow">
          <TabsContent value="general_settings" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  System Information
                </CardTitle>
                <CardDescription>Update your clinic's basic information and contact details</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="system-name" className="text-base font-medium">
                        System Name
                      </Label>
                      <Input
                          id="system-name"
                          value={systemName}
                          onChange={(e) => setSystemName(e.target.value)}
                          placeholder="Enter system name"
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">System Logo</h3>
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

                    <div className="space-y-2">
                      <Label htmlFor="date-format" className="text-base font-medium">
                        Date Format
                      </Label>
                      <Select value={dateFormat} onValueChange={setDateFormat}>
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          {dateFormatOptions.map((format) => (
                              <SelectItem key={format} value={format}>
                                {format}
                              </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-page-title" className="text-base font-medium">
                        Admin Page Title
                      </Label>
                      <Input
                          id="admin-page-title"
                          value={adminPageTitle}
                          onChange={(e) => setAdminPageTitle(e.target.value)}
                          placeholder="Enter admin page title"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="member-code-prefix" className="text-base font-medium">
                        Member Code Prefix
                      </Label>
                      <Input
                          id="member-code-prefix"
                          value={memberCodePrefix}
                          onChange={(e) => setMemberCodePrefix(e.target.value)}
                          placeholder="Enter prefix"
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Admin login page background</h3>
                      <div className="flex items-center gap-4">
                        <div className="h-24 w-24 shrink-0 rounded-sm bg-muted flex items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <input type="file" id="admin-bg" className="hidden" />
                          <Button variant="outline" onClick={() => document.getElementById("admin-bg")?.click()}>Upload Photo</Button>
                          <p className="text-sm text-muted-foreground">Upload a profile photo. JPG, PNG or GIF. Max 2MB.</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="member-minimum-age" className="text-base font-medium">
                        Member Minimum Age
                      </Label>
                      <Input
                          id="member-minimum-age"
                          type="number"
                          value={memberMinimumAge}
                          onChange={(e) => setMemberMinimumAge(e.target.value)}
                          placeholder="Enter minimum age"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-page-paragraph" className="text-base font-medium">
                        Admin Page Paragraph
                      </Label>
                      <Textarea
                          id="admin-page-paragraph"
                          value={adminPageParagraph}
                          onChange={(e) => setAdminPageParagraph(e.target.value)}
                          placeholder="Enter admin page description"
                          rows={4}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button className="px-8">Save Configuration</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences" className="space-y-4 mt-0">
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
          <TabsContent value="seo_settings" className="space-y-4 mt-0">
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
          <TabsContent value="language" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Language
                </CardTitle>
                <CardDescription>Update your clinic's basic information and contact details</CardDescription>
              </CardHeader>

              <Tabs defaultValue="all" className="px-3 md:px-4 xxl:px-6 space-y-6">
                <TabsList className="w-full sm:w-fit flex">
                  {langaugeTabs.map((language) => (
                      <TabsTrigger key={language.id} value={language.id} className="px-6">
                        {language.title}
                      </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-0">
                  <div className="py-3 md:py-4 xxl:py-6">
                    <Table className="whitespace-nowrap">
                      <TableHeader>
                        <TableRow>
                          <TableHead>#</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Image</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {languages.map((language) => (
                            <TableRow key={language.id}>
                              <TableCell>{language.id}</TableCell>
                              <TableCell>{language.name}</TableCell>
                              <TableCell>{language.code}</TableCell>
                              <TableCell>{language.flag}</TableCell>
                              <TableCell className="text-right flex justify-end gap-2">
                                <Button variant="outline" size="icon">
                                  <Link href="/packages/1">
                                    <Pencil className="w-4 h-4" />
                                  </Link>
                                </Button>
                                <Button variant="outline" size="icon">
                                  <Trash className="w-4 h-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="add_name" className="space-y-4 mt-0">
                  <div className="space-y-4 py-3 md:py-4 xxl:py-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Name</Label>
                      <Input id="first-name" placeholder="Enter name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="first-name">Code</Label>
                      <Input id="first-name" placeholder="Enter code" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Image</h3>
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
                  </div>
                </TabsContent>
                <TabsContent value="default" className="space-y-4 mt-0">
                  <div className="py-3 md:py-4 xxl:py-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="use-insurance">Default Language</Label>
                      <Switch id="use-insurance" defaultChecked />
                    </div>
                    <div className="flex justify-end pt-6">
                      <Button className="px-8">Save Configuration</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>
          <TabsContent value="currency" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Language
                </CardTitle>
                <CardDescription>Update your clinic's basic information and contact details</CardDescription>
              </CardHeader>

              <Tabs defaultValue="all" className="px-3 md:px-4 xxl:px-6 space-y-6">
                <TabsList className="w-full sm:w-fit flex">
                  {currencyTabs.map((item) => (
                      <TabsTrigger key={item.id} value={item.id} className="px-6">
                        {item.title}
                      </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-0">
                  <div className="py-3 md:py-4 xxl:py-6">
                    <Table className="whitespace-nowrap">
                      <TableHeader>
                        <TableRow>
                          <TableHead>#</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>RTL</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currencies.map(currency => (
                            <TableRow>
                              <TableCell>{currency.id}</TableCell>
                              <TableCell>{currency.name}</TableCell>
                              <TableCell>{currency.code}</TableCell>
                              <TableCell>{currency.jsx}</TableCell>
                              <TableCell className="text-right flex justify-end gap-2">
                                <Button variant="outline" size="icon">
                                  <Link href="/packages/1">
                                    <Pencil className="w-4 h-4" />
                                  </Link>
                                </Button>
                                <Button variant="outline" size="icon">
                                  <Trash className="w-4 h-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="add_name" className="space-y-4 mt-0">
                  <div className="space-y-4 py-3 md:py-4 xxl:py-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Name</Label>
                      <Input id="first-name" placeholder="Enter name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="first-name">Code</Label>
                      <Input id="first-name" placeholder="Enter code" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="first-name">Symbol</Label>
                      <Input id="first-name" placeholder="Enter symbol" />
                    </div>

                    <div className="flex justify-end pt-6">
                      <Button className="px-8">Save Configuration</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="default" className="space-y-4 mt-0">
                  <div className="py-3 md:py-4 xxl:py-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Default</Label>
                      <Input id="first-name" placeholder="Enter Default" />
                    </div>
                    <div className="flex justify-end pt-6">
                      <Button className="px-8">Save Configuration</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="set_format" className="py-3 md:py-4 xxl:py-6 space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Symbol Format</Label>
                    <Input id="first-name" placeholder="Enter Default" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Decimal Separator</Label>
                    <Input id="first-name" placeholder="Enter Default" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="first-name">No of decimals</Label>
                    <Input id="first-name" placeholder="Enter Default" />
                  </div>
                  <div className="flex justify-end pt-6">
                    <Button className="px-8">Save Configuration</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>
          <TabsContent value="payment_methods" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Update your clinic's basic information and contact details</CardDescription>
              </CardHeader>

              <Tabs defaultValue="mollie" className="px-3 md:px-4 xxl:px-6 space-y-6">
                <TabsList className="w-full sm:w-fit flex">
                  {paymentMethods.map((method) => (
                      <TabsTrigger key={method.id} value={method.id} className="px-6">
                        {method.title}
                      </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="mollie" className="mt-0">
                  <div className="py-3 md:py-4 xxl:py-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`show-12`} className="sm:w-1/2">Mobile Key</Label>
                      <Input placeholder="Enter value" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`show-13}`} className="w-1/3">Activation Status</Label>
                      <Switch id={`show-13`}/>
                    </div>

                    <div className="flex justify-end pt-6">
                      <Button className="px-8">Save Configuration</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="stripe" className="mt-0">
                  <div className="py-3 md:py-4 xxl:py-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`show-12`} className="sm:w-1/2">Stripe Secret</Label>
                      <Input placeholder="Enter value" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`show-12`} className="sm:w-1/2">Stripe Publish</Label>
                      <Input placeholder="Enter value" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`show-13}`} className="w-1/3">Activation Status</Label>
                      <Switch id={`show-13`}/>
                    </div>

                    <div className="flex justify-end pt-6">
                      <Button className="px-8">Save Configuration</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>
          <TabsContent value="smtp_settings" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  SMTP Settings
                </CardTitle>
                <CardDescription>Update your clinic's basic information and contact details</CardDescription>
              </CardHeader>

              <Tabs defaultValue="setting" className="px-3 md:px-4 xxl:px-6 space-y-6">
                <TabsList className="w-full sm:w-fit flex">
                  {smtpTabs.map((method) => (
                      <TabsTrigger key={method.id} value={method.id} className="px-6">
                        {method.title}
                      </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="setting" className="mt-0">
                  <div className="py-3 md:py-4 xxl:py-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`show-12`} className="sm:w-1/2">MAIL HOST</Label>
                      <Input placeholder="Enter value" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`show-12`} className="sm:w-1/2">MAIL PORT</Label>
                      <Input placeholder="Enter value" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`show-12`} className="sm:w-1/2">MAIL USERNAME</Label>
                      <Input placeholder="Enter value" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`show-12`} className="sm:w-1/2">MAIL PASSWORD</Label>
                      <Input placeholder="Enter value" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`show-12`} className="sm:w-1/2">MAIL ENCRYPTION</Label>
                      <Input placeholder="Enter value" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`show-12`} className="sm:w-1/2">MAIL FROM ADDRESS</Label>
                      <Input placeholder="Enter value" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`show-12`} className="sm:w-1/2">MAIL FROM NAMME</Label>
                      <Input placeholder="Enter value" />
                    </div>

                    <div className="flex justify-end pt-6">
                      <Button className="px-8">Save Configuration</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="test" className="mt-0">
                  <div className="py-3 md:py-4 xxl:py-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Enter Email to Test" />
                    </div>

                    <div className="flex justify-end pt-6">
                      <Button className="px-8">Send Mail</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="instructions" className="mt-0">
                  <div className="py-3 md:py-4 xxl:py-6 space-y-4">
                    <div className="space-y-6">
                      <Alert variant="destructive">
                        <AlertTitle className="text-red-600">Please be careful!</AlertTitle>
                        <AlertDescription>
                          When configuring SMTP, incorrect settings may cause errors during order placement, user registration, and newsletters.
                        </AlertDescription>
                      </Alert>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-muted-foreground">For Non-SSL</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p>Select <strong>sendmail</strong> for Mail Driver if SMTP causes issues.</p>
                          <p>Set <strong>Mail Host</strong> according to your server Mail Client Manual Settings.</p>
                          <p>Set <strong>Mail port</strong> as <code>587</code>.</p>
                          <p>Set <strong>Mail Encryption</strong> as <code>ssl</code> if you face issues with <code>tls</code>.</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-muted-foreground">For SSL</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p>Select <strong>sendmail</strong> for Mail Driver if SMTP causes issues.</p>
                          <p>Set <strong>Mail Host</strong> according to your server Mail Client Manual Settings.</p>
                          <p>Set <strong>Mail port</strong> as <code>465</code>.</p>
                          <p>Set <strong>Mail Encryption</strong> as <code>ssl</code>.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
