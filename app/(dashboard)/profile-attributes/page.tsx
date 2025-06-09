"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Switch} from "@/components/ui/switch";
import {Trash2, TrashIcon} from "lucide-react";

const profileAttributes = [
  { id: "origin", label: "Origin" },
  { id: "religion", label: "Religion" },
  { id: "relation_status", label: "Relation Status" },
  { id: "children", label: "Children" },
  { id: "education", label: "Education" },
  { id: "eye_color", label: "Eye Color" },
  { id: "hair_color", label: "Hair Color" },
  { id: "body_type", label: "Body Type" },
  { id: "appearance", label: "Appearance" },
  { id: "clothing_styles", label: "Clothing Styles" },
  { id: "intelligence", label: "Intelligence" },
  { id: "character_traits", label: "Character Traits" },
  { id: "sports", label: "Sports" },
  { id: "hobbies", label: "Hobbies" },
  { id: "music", label: "Music" },
  { id: "kitchen", label: "Kitchen" },
  { id: "am_looking_for", label: "Am Looking for" },
  { id: "career", label: "Career" },
  { id: "known_languages", label: "Known Languages" },
  { id: "reading", label: "Reading" },
  { id: "tv_shows", label: "TV Shows" },
  { id: "lengte", label: "Lengte" },
  { id: "languages", label: "Languages" },
  { id: "diploma", label: "Diploma" },
  { id: "mother_tongue", label: "Mother Tongue" },
  { id: "personal_attitude", label: "Personal Attitude" },
  { id: "cast", label: "Cast" },
  { id: "sub_cast", label: "Sub-Cast" },
  { id: "i_am_a", label: "I am a" },
  { id: "smoke", label: "Smoke" },
  { id: "drinking", label: "Drinking" },
  { id: "going_out", label: "Going Out" }
];

export default function AppointmentsPage() {

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Profile Attributes</h2>
            <p className="text-muted-foreground">Manage your clinic's appointments and schedules.</p>
          </div>
        </div>

        <Tabs defaultValue="origin" className="flex gap-4 flex-wrap">

          <div>
            <TabsList className="flex flex-col h-fit w-full sm:w-fit">
              {profileAttributes.map((attribute) => <TabsTrigger key={attribute.id} value={attribute.id} className="p-3 w-full justify-start">{attribute.label}</TabsTrigger>)}
            </TabsList>
          </div>

          <div className="grow">
            {profileAttributes.map((attribute) => (
                <TabsContent key={attribute.id} value={attribute.id} className="space-y-4 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>{attribute.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`show-${attribute.id}`} className="sm:w-1/2">Show on profile</Label>
                          <Switch id={`show-${attribute.id}`} />
                        </div>

                        <div className="flex flex-col gap-4">
                          <div className="flex gap-1 items-center">
                            <Input placeholder="Enter value" />
                            <Button variant="ghost" size="icon" className="ml-2" >
                              <Trash2 className="h-6 w-6 text-red-400"/>
                            </Button>
                          </div>
                          <div className="flex gap-1 items-center">
                            <Input placeholder="Enter value" />
                            <Button variant="ghost" size="icon" className="ml-2" >
                              <Trash2 className="h-6 w-6 text-red-400"/>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button type="submit" variant="secondary">Add Field</Button>
                      <Button type="submit">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </>
  );
}
