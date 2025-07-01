"use client"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ArrowLeft, Mail} from "lucide-react"
import Link from "next/link"
import {Switch} from "@/components/ui/switch";
import {SimpleEditor} from "@/components/tiptap-templates/simple/simple-editor";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {FormEvent, useState} from "react";

const languages = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "italian", label: "Italian" },
];

export default function NotificationsDetailsPage() {
  const [activeTab, setActiveTab] = useState("english");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="outline" size="icon" asChild className="h-8 w-8">
            <Link href="/settings">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Notification Settings</h1>
            <p className="text-sm text-muted-foreground">Configure email, SMS, and in-app notifications</p>
          </div>
        </div>

        <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5">
            {languages.map((lang) => (
                <TabsTrigger key={lang.value} value={lang.value}>
                  {lang.label}
                </TabsTrigger>
            ))}
          </TabsList>

          {languages.map((lang) => (
              <TabsContent key={lang.value} value={lang.value}>
                <Card className="bg-background">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 !pb-0">
                    <CardTitle className="text-sm xl:text-lg font-medium">
                      Welcome Email - {lang.label}
                    </CardTitle>
                    <Mail className="size-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-8" onSubmit={handleSubmit}>
                      <div className="space-y-6 rounded-lg border p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor={`${lang.value}-status`} className="text-base">
                              Template Status
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Enable or disable this email template
                            </p>
                          </div>
                          <Switch
                              id={`${lang.value}-status`}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`${lang.value}-subject`} className="text-base">
                            Email Subject
                          </Label>
                          <Input
                              id={`${lang.value}-subject`}
                              placeholder={`e.g., Welcome to Our Platform (${lang.label})`}
                              className="text-base py-2 h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`${lang.value}-content`} className="text-base">
                            Email Content
                          </Label>
                          <SimpleEditor/>
                          <p className="text-sm text-muted-foreground">
                            Use the toolbar to format your email content
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4">
                        <Button type="submit" className="px-8">
                          Save {lang.label} Template
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
          ))}
        </Tabs>
      </div>
  )
}