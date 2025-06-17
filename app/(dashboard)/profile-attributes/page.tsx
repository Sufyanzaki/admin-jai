"use client";

import { useState } from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Switch} from "@/components/ui/switch";
import {X} from "lucide-react";

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

// Define the shape of a profile attribute
type ProfileAttribute = {
  id: string;
  label: string;
};


// Define the attribute data shape
type AttributeData = {
  showOn: boolean;
  values: string[];
  inputValue: string;
};

type AttributeDataState = {
  [key: string]: AttributeData;
};

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
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Profile Attributes
            </h2>
            <p className="text-muted-foreground">
              A collection of UI components and widgets for building dashboards
              and interfaces.
            </p>
          </div>

          <Tabs defaultValue="origin" className="w-full">
            <div className="mb-6">
              <TabsList className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-1 h-auto w-full bg-muted/50 p-2">
                {profileAttributes.map((attribute) => (
                    <TabsTrigger
                        key={attribute.id}
                        value={attribute.id}
                        className="text-xs px-2 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      {attribute.label}
                    </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div>
              {profileAttributes.map((attribute) => (
                  <TabsContent
                      key={attribute.id}
                      value={attribute.id}
                      className="mt-0"
                  >
                    <Card className="shadow-sm">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl">
                          {attribute.label}
                        </CardTitle>
                        <CardDescription>
                          Add values for {attribute.label.toLowerCase()} that will
                          appear on your profile.
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4">
                          <Label
                              htmlFor={`show-${attribute.id}`}
                              className="font-medium"
                          >
                            Show on profile
                          </Label>
                          <Switch
                              id={`show-${attribute.id}`}
                              checked={attributeData[attribute.id]?.showOn || false}
                              onCheckedChange={(checked) =>
                                  updateAttribute(attribute.id, "showOn", checked)
                              }
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Input
                                placeholder={`Add ${attribute.label.toLowerCase()} value...`}
                                value={
                                    attributeData[attribute.id]?.inputValue || ""
                                }
                                onChange={(e) =>
                                    updateAttribute(
                                        attribute.id,
                                        "inputValue",
                                        e.target.value
                                    )
                                }
                                onKeyPress={(e) => handleKeyPress(e, attribute.id)}
                                className="flex-1"
                            />
                            <Button
                                onClick={() => addChip(attribute.id)}
                                disabled={
                                  !attributeData[attribute.id]?.inputValue?.trim()
                                }
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
                                  {attributeData[attribute.id].values.map(
                                      (value, index) => (
                                          <div
                                              key={index}
                                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
                                          >
                                            <span>{value}</span>
                                            <button
                                                onClick={() =>
                                                    removeChip(attribute.id, value)
                                                }
                                                className="hover:bg-primary/30 rounded-full p-0.5 transition-colors"
                                                aria-label={`Remove ${value}`}
                                            >
                                              <X className="h-3 w-3" />
                                            </button>
                                          </div>
                                      )
                                  )}
                                </div>
                              </div>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="flex justify-end gap-3 pt-6">
                        <Button
                            variant="outline"
                            onClick={() =>
                                updateAttribute(attribute.id, "values", [])
                            }
                            disabled={
                                attributeData[attribute.id]?.values?.length === 0
                            }
                        >
                          Clear All
                        </Button>
                        <Button>Save Changes</Button>
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
