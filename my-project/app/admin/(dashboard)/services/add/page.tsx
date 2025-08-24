"use client";

import { Button } from "@/components/admin/ui/button";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/admin/ui/form";
import { Input } from "@/components/admin/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/admin/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Switch } from "@/components/admin/ui/switch";
import { Textarea } from "@/components/admin/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";


export default function AddServicePage() {

  const { t } = useTranslation();
  const formSchema = z.object({
  name: z.string().min(2, {
    message: t("Service name must be at least 2 characters."),
  }),
  description: z.string().min(10, {
    message: t("Description must be at least 10 characters."),
  }),
  department: z.string().min(1, {
    message: t("Please select a department."),
  }),
  type: z.string().min(1, {
    message: t("Please select a service type."),
  }),
  duration: z.string().min(1, {
    message: t("Please enter the service duration."),
  }),
  price: z.string().min(1, {
    message: t("Please enter the service price."),
  }),
  insuranceCovered: z.boolean().default(false),
  requiresReferral: z.boolean().default(false),
  availability: z.string().min(1, {
    message: t("Please select availability."),
  }),
  preparationInstructions: z.string().optional(),
});


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      department: "",
      type: "",
      duration: "",
      price: "",
      insuranceCovered: false,
      requiresReferral: false,
      availability: "all",
      preparationInstructions: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real application, you would submit this data to your backend
    alert("Service added successfully!");
  }

  return (
    <div className="flex flex-col gap-5 p-4 xl:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">{t("Add Service")}</h2>
          <p className="text-muted-foreground">
            {t("Create a new service offering such as premium memberships, profile boosts, or personalized matchmaking.")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/services">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("Back to Services")}
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("Service Information")}</CardTitle>
          <CardDescription>{t("Enter the details for the new service")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Service Name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("e.g. Comprehensive Health Checkup")} {...field} />
                      </FormControl>
                      <FormDescription>{t("The official name of the service")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Department")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("Select a department")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cardiology">{t("Cardiology")}</SelectItem>
                          <SelectItem value="neurology">{t("Neurology")}</SelectItem>
                          <SelectItem value="pediatrics">{t("Pediatrics")}</SelectItem>
                          <SelectItem value="orthopedics">{t("Orthopedics")}</SelectItem>
                          <SelectItem value="dermatology">{t("Dermatology")}</SelectItem>
                          <SelectItem value="ophthalmology">{t("Ophthalmology")}</SelectItem>
                          <SelectItem value="psychiatry">{t("Psychiatry")}</SelectItem>
                          <SelectItem value="radiology">{t("Radiology")}</SelectItem>
                          <SelectItem value="oncology">{t("Oncology")}</SelectItem>
                          <SelectItem value="endocrinology">{t("Endocrinology")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>{t("The department that offers this service")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Service Type")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("Select service type")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="diagnostic">{t("Diagnostic")}</SelectItem>
                          <SelectItem value="treatment">{t("Treatment")}</SelectItem>
                          <SelectItem value="preventive">{t("Preventive")}</SelectItem>
                          <SelectItem value="consultation">{t("Consultation")}</SelectItem>
                          <SelectItem value="procedure">{t("Procedure")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>{t("The category this service falls under")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Duration")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("e.g. 30 min")} {...field} />
                      </FormControl>
                      <FormDescription>{t("Average time required for this service")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Price")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("e.g. $150")} {...field} />
                      </FormControl>
                      <FormDescription>{t("Standard price for this service")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{t("Availability")}</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="all" />
                            </FormControl>
                            <FormLabel className="font-normal">{t("All days")}</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="weekdays" />
                            </FormControl>
                            <FormLabel className="font-normal">{t("Weekdays only")}</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="limited" />
                            </FormControl>
                            <FormLabel className="font-normal">{t("Limited availability")}</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="insuranceCovered"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">{t("Insurance Coverage")}</FormLabel>
                          <FormDescription>{t("Is this service typically covered by insurance?")}</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requiresReferral"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">{t("Referral Required")}</FormLabel>
                          <FormDescription>
                            {t("Specify if this service or membership requires a referral from an agent or existing member.")}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Description")}</FormLabel>
                        <FormControl>
                          <Textarea placeholder={t("Provide a detailed description of the service...")} className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormDescription>{t("Detailed description of what the service includes")}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="preparationInstructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Preparation Instructions")}</FormLabel>
                        <FormControl>
                          <Textarea placeholder={t("Instructions for patients before the service (if applicable)...")} className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormDescription>{t("Any special instructions patients need to follow before the service")}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  {t("Create Service")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
