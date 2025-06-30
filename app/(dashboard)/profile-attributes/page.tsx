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

// Define the attribute data shape
type AttributeData = {
  showOn: boolean;
  values: string[];
  inputValue: string;
};

type AttributeDataState = {
  [key: string]: AttributeData;
};

function getAttributeIcon(id: string) {
  const iconProps = { className: "h-4 w-4" };

  switch(id) {
    case 'origin':
      return <Globe {...iconProps} />;
    case 'religion':
      return <Church {...iconProps} />;
    case 'relation_status':
      return <Heart {...iconProps} />;
    case 'children':
      return <Baby {...iconProps} />;
    case 'education':
      return <GraduationCap {...iconProps} />;
    case 'eye_color':
      return <Eye {...iconProps} />;
    case 'hair_color':
      return <Scissors {...iconProps} />;
    case 'body_type':
      return <User {...iconProps} />;
    case 'appearance':
      return <Smile {...iconProps} />;
    case 'clothing_styles':
      return <Shirt {...iconProps} />;
    case 'intelligence':
      return <Brain {...iconProps} />;
    case 'character_traits':
      return <User {...iconProps} />;
    case 'sports':
      return <Trophy {...iconProps} />;
    case 'hobbies':
      return <Palette {...iconProps} />;
    case 'music':
      return <Music {...iconProps} />;
    case 'kitchen':
      return <Utensils {...iconProps} />;
    case 'am_looking_for':
      return <Search {...iconProps} />;
    case 'career':
      return <Briefcase {...iconProps} />;
    case 'known_languages':
      return <Languages {...iconProps} />;
    case 'reading':
      return <Book {...iconProps} />;
    case 'tv_shows':
      return <Tv {...iconProps} />;
    case 'lengte':
      return <Ruler {...iconProps} />;
    case 'languages':
      return <MessageSquare {...iconProps} />;
    case 'diploma':
      return <FileText {...iconProps} />;
    case 'mother_tongue':
      return <Mic {...iconProps} />;
    case 'personal_attitude':
      return <Sun {...iconProps} />;
    case 'cast':
      return <Users {...iconProps} />;
    case 'sub_cast':
      return <UserCog {...iconProps} />;
    case 'i_am_a':
      return <UserCheck {...iconProps} />;
    case 'smoke':
      return <User {...iconProps} />;
    case 'drinking':
      return <GlassWater {...iconProps} />;
    case 'going_out':
      return <PartyPopper {...iconProps} />;
    default:
      return <Circle {...iconProps} />;
  }
}

export default function AppointmentsPage() {
  const [attributeData, setAttributeData] = useState<AttributeDataState>(
      profileAttributes.reduce((acc, attr) => {
        acc[attr.id] = { showOn: false, values: [], inputValue: "" };
        return acc;
      }, {} as AttributeDataState)
  );

  const updateAttribute = (
      attrId: string,
      field: keyof AttributeData,
      value: boolean | string[] | string
  ) => {
    setAttributeData((prev) => ({
      ...prev,
      [attrId]: {
        ...prev[attrId],
        [field]: value as never,
      },
    }));
  };

  const addChip = (attrId: string) => {
    const inputValue = attributeData[attrId]?.inputValue?.trim();
    if (
        inputValue &&
        !attributeData[attrId].values.includes(inputValue)
    ) {
      updateAttribute(attrId, "values", [
        ...attributeData[attrId].values,
        inputValue,
      ]);
      updateAttribute(attrId, "inputValue", "");
    }
  };

  const removeChip = (attrId: string, valueToRemove: string) => {
    updateAttribute(
        attrId,
        "values",
        attributeData[attrId].values.filter((value) => value !== valueToRemove)
    );
  };

  const handleKeyPress = (
      e: React.KeyboardEvent<HTMLInputElement>,
      attrId: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addChip(attrId);
    }
  };

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

          <Tabs defaultValue="origin" className="flex flex-col md:flex-row gap-6 w-full">
            <div className="w-full md:w-64">
              <TabsList className="flex md:flex-col flex-row gap-1 h-auto w-full bg-muted/50 p-2 overflow-x-auto md:overflow-visible">
                {profileAttributes.map((attribute) => (
                    <TabsTrigger
                        key={attribute.id}
                        value={attribute.id}
                        className="justify-between border rounded-sm gap-2 px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm w-full min-w-[140px] md:min-w-0"
                    >
                      <div className="flex items-center gap-2">
                        {getAttributeIcon(attribute.id)}
                        <span className="truncate">{attribute.label}</span>
                      </div>

                      <span className="border px-1 text-[10px] rounded-sm">0</span>
                    </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="flex-1 w-full">
              {profileAttributes.map((attribute) => (
                  <TabsContent key={attribute.id} value={attribute.id} className="mt-0">
                    <Card className="shadow-sm">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl">{attribute.label}</CardTitle>
                        <CardDescription>
                          Add values for {attribute.label.toLowerCase()} that will appear on your profile.
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between py-4">
                          <Label htmlFor={`show-${attribute.id}`} className="font-medium">
                            Show on profile
                          </Label>
                          <Switch
                              id={`show-${attribute.id}`}
                              checked={attributeData[attribute.id]?.showOn || false}
                              onCheckedChange={(checked) => updateAttribute(attribute.id, "showOn", checked)}
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                                placeholder={`Add ${attribute.label.toLowerCase()} value...`}
                                value={attributeData[attribute.id]?.inputValue || ""}
                                onChange={(e) => updateAttribute(attribute.id, "inputValue", e.target.value)}
                                onKeyDown={(e) => handleKeyPress(e, attribute.id)}
                                className="flex-1"
                            />
                            <Button
                                onClick={() => addChip(attribute.id)}
                                disabled={!attributeData[attribute.id]?.inputValue?.trim()}
                                variant="outline"
                            >
                              Add
                            </Button>
                          </div>

                          {attributeData[attribute.id]?.values?.length > 0 && (
                              <div className="space-y-3">
                                <Label className="text-sm font-medium text-muted-foreground">
                                  Current values:
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                  {attributeData[attribute.id].values.map((value, index) => (
                                      <Badge key={index} variant="secondary">
                                        <span className="truncate max-w-[120px]">{value}</span>
                                        <button
                                            onClick={() => removeChip(attribute.id, value)}
                                            className="hover:bg-primary/30 rounded-md p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            aria-label={`Remove ${value}`}
                                        >
                                          <X className="h-3.5 w-3.5" />
                                        </button>
                                      </Badge>
                                  ))}
                                </div>
                              </div>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
                        <Button
                            variant="outline"
                            onClick={() => updateAttribute(attribute.id, "values", [])}
                            disabled={attributeData[attribute.id]?.values?.length === 0}
                            className="w-full sm:w-auto"
                        >
                          Clear All
                        </Button>
                        <Button className="w-full sm:w-auto">Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
  );
}
