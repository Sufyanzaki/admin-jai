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

const firebaseInstructions = [
  "Log in to Google Firebase and Create a new app if you don’t have any.",
  "Go to Project Settings and select General tab.",
  "Select Config and you will find Firebase Config Credentials.",
  "Copy your App’s Credentials and paste the Credentials into appropriate fields.",
  "Now, select Cloud Messaging tab and Enable Cloud Messaging API.",
  "After enabling Cloud Messaging API, you will find Server Key. Copy the key value and paste into FIREBASE SERVER KEY field.",
  'Configure the "firebase-messaging-sw.js" file and keep the file in the root directory of your cPanel.'
]

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
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  Google Login
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="google-status">Activation</Label>
                      <p className="text-xs text-muted-foreground">Enable Google authentication</p>
                    </div>
                    <Switch id="google-status" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="google-client-id">CLIENT ID</Label>
                      <Input id="google-client-id" placeholder="Enter Google Client ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="google-client-secret">CLIENT SECRET</Label>
                      <Input id="google-client-secret" type="password" placeholder="Enter Google Client Secret" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Facebook Login */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Facebook className="h-5 w-5" />
                  Facebook Login
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="facebook-status">Activation</Label>
                      <p className="text-xs text-muted-foreground">Enable Facebook authentication</p>
                    </div>
                    <Switch id="facebook-status" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebook-client-id">CLIENT ID</Label>
                      <Input id="facebook-client-id" placeholder="Enter Facebook App ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebook-client-secret">CLIENT SECRET</Label>
                      <Input id="facebook-client-secret" type="password" placeholder="Enter Facebook App Secret" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 flex-wrap">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save All Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="third-party" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Third Party Settings
              </CardTitle>
              <CardDescription>Configure third-party integrations and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google reCAPTCHA Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Google reCAPTCHA</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="recaptcha-status">Activation Status</Label>
                      <p className="text-xs text-muted-foreground">
                        Enable/disable Google reCAPTCHA protection
                      </p>
                    </div>
                    <Switch id="recaptcha-status" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="site-key">SITE KEY</Label>
                      <Input
                          id="site-key"
                          placeholder="Enter your reCAPTCHA site key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secret-key">SECRET KEY</Label>
                      <Input
                          id="secret-key"
                          type="password"
                          placeholder="Enter your reCAPTCHA secret key"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 flex-wrap">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
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
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Mollie Settings</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mollie-key">Mobile Key</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                          id="mollie-key"
                          type="password"
                          placeholder="Enter your Mollie API key"
                      />
                      <Button variant="outline" size="sm">
                        Test
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mollie-status">Activation Status</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="mollie-status" />
                      <span className="text-sm">Enable Mollie payments</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Stripe Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Stripe Settings</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                          id="stripe-secret"
                          type="password"
                          placeholder="Enter your Stripe secret key"
                      />
                      <Button variant="outline" size="sm">
                        Test
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stripe-publish">Stripe Publishable Key</Label>
                    <Input
                        id="stripe-publish"
                        type="password"
                        placeholder="Enter your Stripe publishable key"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stripe-status">Activation Status</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="stripe-status" />
                      <span className="text-sm">Enable Stripe payments</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 flex-wrap">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="smtp" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                SMTP Settings
              </CardTitle>
              <CardDescription>Configure your email server settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* SMTP Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">SMTP Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mail-host">MAIL HOST</Label>
                    <Input id="mail-host" placeholder="smtp.example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mail-port">MAIL PORT</Label>
                    <Input id="mail-port" placeholder="587" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mail-username">MAIL USERNAME</Label>
                    <Input id="mail-username" placeholder="your@email.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mail-password">MAIL PASSWORD</Label>
                    <Input id="mail-password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mail-encryption">MAIL ENCRYPTION</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select encryption" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mail-from-address">MAIL FROM ADDRESS</Label>
                    <Input id="mail-from-address" placeholder="noreply@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mail-from-name">MAIL FROM NAME</Label>
                    <Input id="mail-from-name" placeholder="Your Company Name" />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Test Email */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Test Email Configuration</h3>
                <div className="flex items-end gap-2">
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor="test-email">Test Email Address</Label>
                    <Input id="test-email" type="email" placeholder="test@example.com" />
                  </div>
                  <Button variant="outline">
                    Send Test Email
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Instructions */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configuration Instructions</h3>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important Notice</AlertTitle>
                  <AlertDescription>
                    Incorrect SMTP settings may cause errors during order placement, user registration, and newsletters.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Non-SSL Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>• Use <strong>sendmail</strong> if SMTP causes issues</p>
                      <p>• Set <strong>Mail Host</strong> per your server settings</p>
                      <p>• Recommended port: <code>587</code></p>
                      <p>• Try <code>ssl</code> if <code>tls</code> fails</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">SSL Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>• Use <strong>sendmail</strong> if SMTP causes issues</p>
                      <p>• Set <strong>Mail Host</strong> per your server settings</p>
                      <p>• Recommended port: <code>465</code></p>
                      <p>• Encryption must be <code>ssl</code></p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 flex-wrap">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="push-notification" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Push Notifications
              </CardTitle>
              <CardDescription>Configure Firebase Cloud Messaging (FCM) settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Settings Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Firebase Configuration</h3>

                <div className="flex items-center justify-between pb-4">
                  <div>
                    <Label htmlFor="push-status">Activation</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable/disable push notifications service
                    </p>
                  </div>
                  <Switch id="push-status" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fcm-api-key">FCM API KEY</Label>
                    <Input id="fcm-api-key" type="password" placeholder="Enter FCM API Key" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fcm-auth-domain">FCM AUTH DOMAIN</Label>
                    <Input id="fcm-auth-domain" placeholder="Enter Auth Domain" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fcm-project-id">FCM PROJECT ID</Label>
                    <Input id="fcm-project-id" placeholder="Enter Project ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fcm-storage-bucket">FCM STORAGE BUCKET</Label>
                    <Input id="fcm-storage-bucket" placeholder="Enter Storage Bucket" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fcm-sender-id">FCM MESSAGING SENDER ID</Label>
                    <Input id="fcm-sender-id" placeholder="Enter Sender ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fcm-app-id">FCM APP ID</Label>
                    <Input id="fcm-app-id" placeholder="Enter App ID" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="firebase-server-key">FIREBASE SERVER KEY</Label>
                    <Input
                        id="firebase-server-key"
                        type="password"
                        placeholder="Enter Firebase Server Key"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Instructions Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Setup Instructions</h3>

                <div className="space-y-3">
                  {firebaseInstructions.map((step, idx) => (
                      <Alert key={idx} className="text-sm">
                        <div className="flex items-start gap-3">
                          <span className="font-medium">{idx + 1}.</span>
                          <AlertDescription>
                            {step}
                          </AlertDescription>
                        </div>
                      </Alert>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 flex-wrap">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
