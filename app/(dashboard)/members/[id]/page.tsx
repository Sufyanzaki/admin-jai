"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    Briefcase,
    Calendar,
    ChevronLeft,
    Coffee,
    Edit,
    Globe,
    GraduationCap,
    Heart,
    LucideIcon,
    Mail,
    MapPin,
    Music,
    Phone,
    Stethoscope,
    User
} from "lucide-react";
import Link from "next/link";
import {useRef} from "react";
import {Separator} from "@/components/ui/separator";

const userProfile = [
    {
        id: "basic_information",
        section: "Introduction",
        data: {
            Username: "amaad",
            "First Name": "amaad",
            "Last Name": "kareem",
            Email: "amaadkareem96@gmail.com",
            "Date of Birth": "03-02-1994",
            Gender: "Man",
            Age: "31",
            Religion: "Boodhist",
            "Relation Status": "Single - nooit getrouwd",
            "Am Looking for": "Vrouw",
            "Children": "Geen",
            Cast: "-",
            Subject: "-",
            "Short Description": "hey i am amaad i am really handsome and by nature nice and calm",
            "Black status": "Unblocked"
        }
    },
    {
        id: "living",
        section: "Living",
        data: {
            Country: "Nederland",
            State: "Gelderland",
            City: "'s-Heerenberg"
        }
    },
    {
        id: "about_me",
        section: "About",
        data: {
            Length: "2.05",
            "Eye Color": "Green",
            "Hair Color": "Bruin",
            "Body Type": "Tenger",
            Weight: "68",
            Appearance: "Spraakmakend",
            "Clothing Styles": "Casual",
            Intelligence: "Geen prioriteit",
            Languages: "-"
        }
    },
    {
        id: "education",
        section: "Education",
        data: {
            Education: "Diploma"
        }
    },
    {
        id: "career",
        section: "Career",
        data: {
            Career: "in de techniek"
        }
    },
    {
        id: "language",
        section: "Language",
        data: {
            "Mother Tongue": "Hindostaans",
            "Known Languages": "Engels"
        }
    },
    {
        id: "hobbies_interest",
        section: "Hobbies",
        data: {
            Sports: "Rugby",
            Music: "blues",
            Kitchen: "Mexicaans",
            Reading: "Familie-en streekromans",
            "TV Shows": "Drama"
        }
    },
    {
        id: "personal_attitude_behavior",
        section: "Behavior",
        data: {
            "Personal Attitude": "romantisch, uitbundig, sloom"
        }
    },
    {
        id: "life_style",
        section: "Life Style",
        data: {
            Smoke: "Ja",
            Drinking: "Nee",
            "Going Out": "Ja"
        }
    },
    {
        id: "partner_expectation",
        section: "Expectation",
        data: {
            Origin: "Hindostaans",
            "Am Looking for": "Man",
            Length: "170",
            Religion: "Moslim",
            "Relation Status": "Single - nooit getrouwd",
            Education: "Basis school",
            Smoke: "Ja",
            Drinking: "Nee",
            "Going Out": "Ja",
            "Range Age": "",
            "From Age": "20",
            "To Age": "35",
            Children: "1",
            Country: "American Samoa",
            State: "-",
            City: "-"
        }
    }
];

interface TabData {
    id: string;
    section: string;
    data: Record<string, string | undefined>;
}

export default function MemberProfilePage({ params }: { params: Promise<{ id: string }> }) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // handle image upload or preview logic here
            console.log("Selected file:", file);
        }
    };

    const getIconForField = (key: string): LucideIcon => {
        const iconMap: Record<string, LucideIcon> = {
            'Email': Mail,
            'Phone': Phone,
            'Country': MapPin,
            'State': MapPin,
            'City': MapPin,
            'Career': Briefcase,
            'Education': GraduationCap,
            'Mother Tongue': Globe,
            'Known Languages': Globe,
            'Sports': Music,
            'Music': Music,
            'Smoke': Coffee,
            'Drinking': Coffee,
            'Religion': Heart
        };
        return iconMap[key] || User;
    };

    const renderTabContent = (tab: TabData) => {
        const validData = Object.entries(tab.data).filter(
            ([key, value]) => value && value !== "-" && value !== ""
        );

        return (
            <div className="space-y-3 text-sm">
                {(
                    tab.id === "hobbies_interest" ||
                    tab.id === "personal_attitude_behavior" ||
                    tab.id === "life_style" ||
                    !["hobbies_interest", "personal_attitude_behavior", "life_style"].includes(tab.id)
                ) && (
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
                )}
            </div>
        );
    };


    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/members">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back to doctors</span>
                    </Link>
                </Button>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Member Profile</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="space-y-4">
                    <Card className="md:col-span-1 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="flex flex-col items-center text-center p-6 space-y-4">
                           <div className="relative">
                               <Avatar className="h-24 w-24 ring-4 ring-primary/20 shadow-md">
                                   <AvatarImage src="/user-2.png" alt="Dr. Sarah Johnson" />
                                   <AvatarFallback className="text-lg font-semibold">SJ</AvatarFallback>
                               </Avatar>
                               <button
                                   type="button"
                                   onClick={handleEditClick}
                                   className="absolute bottom-0 left-3/4 bg-gray-500/90 rounded-md p-2 shadow-md"
                               >
                                   <Edit className="h-4 w-4 text-white" />
                               </button>

                               <input
                                   type="file"
                                   accept="image/*"
                                   ref={fileInputRef}
                                   onChange={handleFileChange}
                                   className="hidden"
                               />
                           </div>
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-semibold">Dr. Sarah Johnson</CardTitle>
                                <Badge
                                    variant="default"
                                    className="py-0.5 font-normal text-xs rounded-md bg-black text-white"
                                >
                                    Active
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground px-6 pb-6">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>sarah.j@clinic.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>555-0101</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>
        123 Medical Center Drive, Suite 456, San Francisco, CA 94143
      </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Joined 5/15/2012</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <span>12 years experience</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Stethoscope className="h-4 w-4" />
                                <span>Medical Department</span>
                            </div>
                        </CardContent>
                    </Card>


                    <Card>
                        <CardHeader className="xxl:!pb-0">
                            <CardTitle>Manage Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">In Active</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" className="w-full">
                                Submit
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2">
                    <Card>
                        <Tabs defaultValue={userProfile[0].id} className="w-full">
                            <CardHeader className="xxl:pb-0 space-y-6">
                                <div className="flex items-center gap-4 justify-between flex-col sm:flex-row">
                                    <CardTitle className="text-xl font-semibold">Member Information</CardTitle>
                                    <Button variant="default" asChild>
                                        <Link href="/members/1/edit">
                                            <Edit className="h-4 w-4" />
                                            <span>Edit Profile</span>
                                        </Link>
                                    </Button>
                                </div>
                                <TabsList className="flex">
                                    {userProfile.map((tab) => (
                                        <TabsTrigger className="px-4 py-2" value={tab.id}>{tab.section}</TabsTrigger>
                                    ))}
                                </TabsList>
                            </CardHeader>

                            {userProfile.map((tab) => (
                                <TabsContent value={tab.id}>
                                    <CardContent>
                                        {renderTabContent(tab)}
                                    </CardContent>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
}
