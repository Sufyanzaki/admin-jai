"use client";

import { useState } from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Switch} from "@/components/ui/switch";
import {
  Globe,
  Church,
  Heart,
  Baby,
  GraduationCap,
  Eye,
  Scissors,
  Smile,
  Shirt,
  Brain,
  User,
  Trophy,
  Palette,
  Music,
  Utensils,
  Search,
  Briefcase,
  Languages,
  Book,
  Tv,
  Ruler,
  MessageSquare,
  FileText,
  Mic,
  Sun,
  Users,
  UserCog,
  UserCheck,
  GlassWater,
  PartyPopper,
  Circle,
  X
} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import AttributeForm from "./_components/attribute-form";
import { useProfileAttributes } from "./_hooks/useProfileAttributes";
import Preloader from "@/components/ui/Preloader";

function getAttributeIcon(label: string) {
  const iconProps = { className: "h-4 w-4" };

  switch (label) {
    case "Origin":
      return <Globe {...iconProps} />;
    case "Religion":
      return <Church {...iconProps} />;
    case "Relation Status":
      return <Heart {...iconProps} />;
    case "Children":
      return <Baby {...iconProps} />;
    case "Education":
      return <GraduationCap {...iconProps} />;
    case "Eye Color":
      return <Eye {...iconProps} />;
    case "Hair Color":
      return <Scissors {...iconProps} />;
    case "Body Type":
      return <User {...iconProps} />;
    case "Appearance":
      return <Smile {...iconProps} />;
    case "Clothing Styles":
      return <Shirt {...iconProps} />;
    case "Intelligence":
      return <Brain {...iconProps} />;
    case "Character Traits":
      return <User {...iconProps} />;
    case "Sports":
      return <Trophy {...iconProps} />;
    case "Hobbies":
      return <Palette {...iconProps} />;
    case "Music":
      return <Music {...iconProps} />;
    case "Kitchen":
      return <Utensils {...iconProps} />;
    case "Am Looking for":
      return <Search {...iconProps} />;
    case "Career":
      return <Briefcase {...iconProps} />;
    case "Known Languages":
      return <Languages {...iconProps} />;
    case "Reading":
      return <Book {...iconProps} />;
    case "TV Shows":
      return <Tv {...iconProps} />;
    case "Length":
      return <Ruler {...iconProps} />;
    case "Languages":
      return <MessageSquare {...iconProps} />;
    case "Diploma":
      return <FileText {...iconProps} />;
    case "Mother Tongue":
      return <Mic {...iconProps} />;
    case "Personal Attitude":
      return <Sun {...iconProps} />;
    case "Cast":
      return <Users {...iconProps} />;
    case "Sub-Cast":
      return <UserCog {...iconProps} />;
    case "I am a":
      return <UserCheck {...iconProps} />;
    case "Smoke":
      return <User {...iconProps} />;
    case "Drinking":
      return <GlassWater {...iconProps} />;
    case "Going Out":
      return <PartyPopper {...iconProps} />;
    default:
      return <Circle {...iconProps} />;
  }
}

export default function AppointmentsPage() {
  const { attributes, loading } = useProfileAttributes();

  if (loading || !attributes) {
    return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader/>
        <p className="text-sm">Loading Atrributes</p>
      </div>
    )
  }

  return (
      <div className="container mx-auto">
        <div className="flex flex-col space-y-6 p-4 xl:p-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Profile Attributes
            </h2>
            <p className="text-muted-foreground">
              Define and display key user characteristics like age, location, interests, and activity status for building personalized profiles and user interfaces.
            </p>
          </div>

          <Tabs defaultValue={attributes[0]?.id?.toString() || "1"} className="flex flex-col md:flex-row gap-6 w-full">
            <div className="w-full md:w-64">
              <TabsList className="flex md:flex-col flex-row gap-1 h-auto w-full bg-muted/50 p-2 overflow-x-auto md:overflow-visible">
                {attributes.map((attribute) => (
                    <TabsTrigger
                        key={attribute.id}
                        value={attribute.id.toString()}
                        className="justify-between border rounded-sm gap-2 px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm w-full min-w-[140px] md:min-w-0"
                    >
                      <div className="flex items-center gap-2">
                        {getAttributeIcon(attribute.label)}
                        <span className="truncate">{attribute.label}</span>
                      </div>

                      <span className="border px-1 text-[10px] rounded-sm">{attribute.options ? attribute.options.split(",").filter(Boolean).length : 0}</span>
                    </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="flex-1 w-full">
              {attributes.map((attribute) => (
                  <TabsContent key={attribute.id} value={attribute.id.toString()} className="mt-0">
                    <Card className="shadow-sm">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl">{attribute.label}</CardTitle>
                        <CardDescription>
                          Add values for {attribute.label.toLowerCase()} that will appear on your profile.
                        </CardDescription>
                      </CardHeader>

                      <AttributeForm attribute={attribute} />
                    </Card>
                  </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
  );
}
