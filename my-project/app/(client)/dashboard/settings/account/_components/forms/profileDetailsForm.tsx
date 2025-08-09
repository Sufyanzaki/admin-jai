import {Button} from "@/components/client/ux/button";
import {X} from "lucide-react";
import {AboutMe2, AboutMe, MoreInfo, BasicInfo, Place, HobbyInterest, LifeStyle, Behavior} from "@/app/(client)/dashboard/settings/account/_components/forms/profileForms";

export default function ProfileDetailsForm(){

    return (
        <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-300 rounded-[5px] p-4">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-yellow-800">
                        ⚠️ Warning: Please ensure all information is accurate before
                        saving.
                    </p>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-yellow-600 hover:bg-yellow-100"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="space-y-10">
                <AboutMe />
                <BasicInfo/>
                <AboutMe2 />
                <HobbyInterest />
                <Place />
                <MoreInfo />
                <LifeStyle />
                <Behavior />
            </div>
        </div>
    )
}