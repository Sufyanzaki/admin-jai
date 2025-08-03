"use client";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePersonalityBehaviorInfo } from "../../_hooks/usePersonalityBehaviorInfo";

interface PersonalityAndBehaviorProps {
  memberId: string | number;
}

export default function PersonalityAndBehavior({ memberId }: PersonalityAndBehaviorProps) {
  const { personalityBehavior, personalityBehaviorLoading: loading, error } = usePersonalityBehaviorInfo();

  if (loading) {
    return (
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading personality & behavior information...</span>
        </div>
      </CardContent>
    );
  }

  if (error || !personalityBehavior) {
    return (
      <CardContent>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No personality & behavior information available</p>
        </div>
      </CardContent>
    );
  }

  const typedPersonalityBehavior = personalityBehavior as any;

  const data = {
    "Personality Type": typedPersonalityBehavior.personalityType || "-",
    "Personal Attitude": typedPersonalityBehavior.personalAttitude || "-",
    "Communication Style": typedPersonalityBehavior.communicationStyle || "-",
    "Social Preferences": typedPersonalityBehavior.socialPreferences || "-",
    "Decision Making": typedPersonalityBehavior.decisionMaking || "-",
    "Stress Management": typedPersonalityBehavior.stressManagement || "-",
    "Conflict Resolution": typedPersonalityBehavior.conflictResolution || "-",
    "Leadership Style": typedPersonalityBehavior.leadershipStyle || "-",
    "Work Style": typedPersonalityBehavior.workStyle || "-",
    "Learning Style": typedPersonalityBehavior.learningStyle || "-",
    "Emotional Intelligence": typedPersonalityBehavior.emotionalIntelligence || "-",
    "Adaptability": typedPersonalityBehavior.adaptability || "-",
    "Creativity": typedPersonalityBehavior.creativity || "-",
    "Analytical Thinking": typedPersonalityBehavior.analyticalThinking || "-",
    "Empathy": typedPersonalityBehavior.empathy || "-",
    "Assertiveness": typedPersonalityBehavior.assertiveness || "-",
    "Patience": typedPersonalityBehavior.patience || "-",
    "Optimism": typedPersonalityBehavior.optimism || "-",
    "Perfectionism": typedPersonalityBehavior.perfectionism || "-",
    "Risk Tolerance": typedPersonalityBehavior.riskTolerance || "-",
  };

  const validData = Object.entries(data).filter(
    ([key, value]) => value && value !== "-" && value !== ""
  );

  return (
    <CardContent>
      <div className="space-y-3 text-sm">
        <div className="space-y-1">
          <div className="grid grid-cols-2 gap-x-8 text-sm">
            {validData.map(([key, value]) => {
              if (
                ["Short Description", "Email", "Phone"].includes(key) ||
                value === "-" ||
                value === ""
              )
                return null;

              return (
                <div key={key}>
                  <div className="grid grid-cols-2 py-1">
                    <span className="font-medium text-muted-foreground">{key}</span>
                    <span className="text-right font-semibold text-primary">
                      {value}
                    </span>
                  </div>
                  <Separator className="my-2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CardContent>
  );
} 