"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Building, MoreVertical, Pencil, Plus, Settings, Trash, Upload} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import AbusiveCard from "./_components/abusive-card";
import CurrencyTable from "./_components/currency-table";
import UserDashboardFooterForm from "./_components/user-dashboard-footer-form";
import FooterSettingsForm from "./_components/footer-settings-form";
import FooterForm from "./_components/footerForm";
import {MultiSelectCombobox} from "@/components/ui/combo-box";
import FooterSectionForm from "@/app/(dashboard)/settings/other-settings/_components/footer-section-form";

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


export default function SettingsPage() {

  const [openFooterDialog, setOpenFooterDialog] = useState(false);



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
          <CurrencyTable />
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
              <FooterForm />
            </CardContent>

          </Card>
        </TabsContent>
        <TabsContent value="footer-settings" className="space-y-4">
          <FooterSettingsForm
            pagesData={pagesData}
            onOpenDialog={() => setOpenFooterDialog(true)}
          />
        </TabsContent>
        <TabsContent value="user-dashboard" className="space-y-4">
          <UserDashboardFooterForm />
        </TabsContent>
      </Tabs>

      {/* Set Format Dialog */}


      <Dialog open={openFooterDialog} onOpenChange={setOpenFooterDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Footer Section</DialogTitle>
            <DialogDescription>
              Provide the name and page associated with this section.
            </DialogDescription>
          </DialogHeader>
          <FooterSectionForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
