import {AlertCircle, ArrowLeft, Building, Facebook, RefreshCw, Save} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {Switch} from "@/components/ui/switch";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import GoogleForm from "./_components/googleForm";
import FacebookForm from "./_components/facebookForm";
import StripeForm from "./_components/stripeForm";
import MollieForm from "./_components/mollieForm";
import CaptchaForm from "./_components/captchaForm";
import PushNotificationForm from "./_components/pushNotificationForm";
import SMTPForm from "./_components/smtpForm";

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col space-y-6 p-4 xl:p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/settings">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">Integrations</h2>
        </div>
      </div>

      <Tabs defaultValue="social">
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-5 md:w-[600px]">
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="third-party">Third Party</TabsTrigger>
          <TabsTrigger value="settings">Payments</TabsTrigger>
          <TabsTrigger value="smtp">SMTP</TabsTrigger>
          <TabsTrigger value="push-notification">Push Noti.</TabsTrigger>
        </TabsList>
        <TabsContent value="social" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Social Media Login
              </CardTitle>
              <CardDescription>Configure social media authentication providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google Login */}
              <GoogleForm />
              <Separator />
              <FacebookForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="third-party" className="space-y-6 pt-4">
          <CaptchaForm />
        </TabsContent>
        <TabsContent value="settings" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>Configure your payment gateway settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mollie Settings */}
              <MollieForm />
              <Separator />
              {/* Stripe Settings */}
              <StripeForm />
            </CardContent>
        
          </Card>
        </TabsContent>
        <TabsContent value="smtp" className="space-y-6 pt-4">
          <SMTPForm />
        </TabsContent>
        <TabsContent value="push-notification" className="space-y-6 pt-4">
          <PushNotificationForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
