"use client";

import {useState} from 'react'
import {Separator} from '@/components/admin/ui/separator'
import {Card, CardContent, CardHeader} from '@/components/admin/ui/card'
import {Button} from '@/components/admin/ui/button'
import {Badge} from '@/components/admin/ui/badge'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/admin/ui/tabs'
import {Activity, Bell, Calendar, Clock, FileText, Key, Lock, Mail, Save, Settings, Shield, User} from 'lucide-react'
import {Switch} from '@/components/admin/ui/switch'
import PasswordForm from './_components/PasswordForm';
import ProfileEditForm from './_components/ProfileEditForm';
import {useProfile} from "@/app/shared-hooks/useProfile";
import RecentActivity from "@/app/admin/(dashboard)/profile/_components/RecentActivity";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const { response } = useProfile();

  const displayUser = response?.user

  return (
    <div className="space-y-6 p-4 xl:p-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Manage your profile settings and account preferences.
        </p>
      </div>
      
      <Separator />
      
      <div className="grid gap-6 md:grid-cols-[1fr,2fr]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Summary Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-semibold">{displayUser?.firstName} {displayUser?.lastName}</h4>
                  <Badge variant="secondary">{displayUser?.role}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Basic Information</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                </div>

                {isEditing ? <ProfileEditForm onFinish={() => setIsEditing(false)} /> : (
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Email</span>
                      </div>
                      <span>{displayUser?.email || "No email provided"}</span>
                    </div>
                  
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Age</span>
                      </div>
                      <span>{displayUser?.age ? `${displayUser.age} years` : "Not specified"}</span>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Security Status */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Security Status</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                  >
                    {isChangingPassword ? 'Save' : 'Change Password'}
                  </Button>
                </div>

                {isChangingPassword ? <PasswordForm /> : (
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">2FA Status</span>
                      <Badge variant="success">Enabled</Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <h4 className="text-sm font-medium">Quick Actions</h4>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Settings className="mr-2 h-4 w-4" />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => setIsChangingPassword(!isChangingPassword)}
              >
                <Lock className="mr-2 h-4 w-4" />
                {isChangingPassword ? 'Cancel Change' : 'Change Password'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs Section */}
        <div className="space-y-6">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <RecentActivity />
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {[
                      {
                        title: "Active Sessions",
                        description: "View and manage your active login sessions",
                        icon: User,
                        action: "View All",
                        status: "warning"
                      },
                      {
                        title: "Login History",
                        description: "Review your recent login activity",
                        icon: Clock,
                        action: "View",
                        status: "enabled"
                      },
                      {
                        title: "Security Notifications",
                        description: "Configure your security alert preferences",
                        icon: Bell,
                        action: "Settings",
                        status: "enabled"
                      },
                      {
                        title: "Backup & Recovery",
                        description: "Manage your account backup and recovery options",
                        icon: Save,
                        action: "Configure",
                        status: "disabled"
                      }
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`rounded-md p-2 ${
                              item.status === "enabled" ? "bg-green-500/20 text-green-600" :
                              item.status === "warning" ? "bg-yellow-500/20 text-yellow-600" :
                              "bg-muted"
                            }`}>
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h5 className="font-medium">{item.title}</h5>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.status === "enabled" && (
                              <Badge variant="success" className="text-xs">Enabled</Badge>
                            )}
                            {item.status === "warning" && (
                              <Badge variant="warning" className="text-xs">Warning</Badge>
                            )}
                            {item.status === "disabled" && (
                              <Badge variant="secondary" className="text-xs">Disabled</Badge>
                            )}
                            <Button variant="outline">{item.action}</Button>
                          </div>
                        </div>
                        {i < 7 && <Separator className="my-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {[
                      {
                        title: "Email Notifications",
                        description: "Receive important updates via email",
                        options: ["Security Alerts", "Account Updates"]
                      }
                    ].map((section, i) => (
                      <div key={i} className="space-y-4">
                        <div>
                          <h5 className="font-medium">{section.title}</h5>
                          <p className="text-sm text-muted-foreground">{section.description}</p>
                        </div>
                        <div className="space-y-3">
                          {section.options.map((option, j) => (
                            <div key={j} className="flex items-center justify-between">
                              <span className="text-sm">{option}</span>
                              <Switch />
                            </div>
                          ))}
                        </div>
                        {i < 2 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}