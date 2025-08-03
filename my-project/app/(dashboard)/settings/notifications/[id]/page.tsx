"use client"
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {ArrowLeft, Mail} from "lucide-react";
import Link from "next/link";
import {Switch} from "@/components/ui/switch";
import {SimpleEditor} from "@/components/tiptap-templates/simple/simple-editor";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import {useEffect, useState} from "react";
import useEmailTemplateForm from "../_hooks/useEmailTemplateForm";
import { Controller } from "react-hook-form";
import {useLanguages} from "@/app/(dashboard)/settings/_hooks/useLanguages";
import Preloader from "@/components/ui/Preloader";

export default function EditEmailTemplatePage() {
  const params = useParams();
  let id = params?.id as string;
  const { languages, languagesLoading } = useLanguages();
  const { handleSubmit, emailTemplate, loading, error, control, onSubmit, isLoading, register, errors } = useEmailTemplateForm({id, languages});

  const [activeTab, setActiveTab] = useState("en");

  useEffect(()=>{
    if(!languages || languages.length < 1) return;

    setActiveTab(languages[0].code);
  }, [languages])

  if (loading || languagesLoading) return(
    <div className="flex items-center flex-col justify-center h-64">
        <Preloader/>
        <p className="text-sm">Loading Template</p>
      </div>
  )
  if (error) return <div className="p-6 text-red-500">Failed to load template.</div>;
  if (!emailTemplate) return <div className="p-6 text-muted-foreground">Template not found.</div>;
  if (!languages || languages.length < 1) return <div className="p-6 text-red-500 text-lg text-center py-12">Please add a language.</div>;

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
            {(languages ?? []).map((lang) => (
                <TabsTrigger key={lang.code} value={lang.code}>
                  {lang.name}
                </TabsTrigger>
            ))}
          </TabsList>

          {(languages ?? []).map((lang, idx) => (
              <TabsContent key={lang.code} value={lang.code}>
                <Card className="bg-background">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 !pb-0">
                    <CardTitle className="text-sm xl:text-lg font-medium">
                      {emailTemplate!.key} - {lang.name}
                    </CardTitle>
                    <Mail className="size-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-8" onSubmit={handleSubmit(values => onSubmit(values, ()=>console.log("Edit successfully")))}>
                      <div className="space-y-6 rounded-lg border p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor={`${lang.code}-status`} className="text-base">
                              Template Status
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Enable or disable this email template
                            </p>
                          </div>
                          <Controller
                            name="isActive"
                            control={control}
                            render={({ field }) => (
                              <Switch
                                id={`${lang.code}-status`}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            )}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`${lang.code}-subject`} className="text-base">
                            Email Subject
                          </Label>
                          <Input
                              id={`${lang.code}-subject`}
                              placeholder={`e.g., Welcome to Our Platform (${lang.name})`}
                              className="text-base py-2 h-12"
                              {...register(`translations.${idx}.subject` as const)}
                          />
                          {(errors.translations?.[idx]?.subject) && (
                            <p className="text-xs text-red-500">
                              {errors.translations[idx]?.subject?.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`${lang.code}-content`} className="text-base">
                            Email Content
                          </Label>
                          <Controller
                            name={`translations.${idx}.content` as const}
                            control={control}
                            render={({ field }) => (
                              <>
                                <SimpleEditor
                                  existingValue={field.value}
                                  onChange={field.onChange}
                                />
                                {(errors.translations?.[idx]?.content) && (
                                  <p className="text-xs text-red-500">
                                    {errors.translations[idx]?.content?.message}
                                  </p>
                                )}
                              </>
                            )}
                          />
                          <p className="text-sm text-muted-foreground">
                            Use the toolbar to format your email content
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4">
                        <Button type="submit" className="px-8" disabled={isLoading}>
                          {isLoading ? "Saving..." : `Save ${lang.name} Template`}
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