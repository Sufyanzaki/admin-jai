"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    Briefcase,
    ChevronLeft,
    Coffee,
    Globe,
    GraduationCap,
    Heart, LucideIcon,
    Mail,
    MapPin,
    Music,
    Phone,
    Upload,
    User
} from "lucide-react";
import Link from "next/link";

const userProfile = [
    {
        id: "basic_information",
        section: "Basic Information",
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
        section: "About Me",
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
        section: "Hobbies & Interest",
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
        section: "Personal Attitude & Behavior",
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
        section: "Partner Expectation",
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

export default function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-500";
            case "On Leave":
                return "border-amber-500 text-amber-500";
            default:
                return "bg-gray-500";
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Active":
                return "default";
            case "On Leave":
                return "outline";
            default:
                return "secondary";
        }
    };

    interface TabData {
        id: string;
        section: string;
        data: Record<string, string | undefined>;
    }

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
        const validData = Object.entries(tab.data).filter(([key, value]) =>
            value && value !== "-" && value !== ""
        );

        return (
            <div className="space-y-4">
                {tab.data["Short Description"] && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Biography</h3>
                        <p className="text-sm mt-2">{tab.data["Short Description"]}</p>
                    </div>
                )}

                {(tab.id === 'hobbies_interest' || tab.id === 'personal_attitude_behavior' || tab.id === 'life_style') && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">
                            {tab.id === 'hobbies_interest' ? 'Interests' :
                                tab.id === 'personal_attitude_behavior' ? 'Personality' : 'Lifestyle'}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {validData.map(([key, value]) => {
                                if (key === "Short Description") return null;
                                const Icon = getIconForField(key);
                                return (
                                    <Badge key={key} variant="outline" className="flex items-center gap-1">
                                        <Icon className="h-3 w-3" />
                                        {key}: {value}
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>
                )}

                {(tab.data.Email || tab.data.Phone) && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Contact Information</h3>
                        <div className="grid gap-2 mt-2">
                            {tab.data.Email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4  shrink-0" />
                                    <span className="text-sm">{tab.data.Email}</span>
                                </div>
                            )}
                            {tab.data.Phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 shrink-0" />
                                    <span className="text-sm">{tab.data.Phone}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {!(['hobbies_interest', 'personal_attitude_behavior', 'life_style'].includes(tab.id)) && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Information</h3>
                        <div className="grid gap-2 mt-2">
                            {validData.map(([key, value]) => {
                                if (key === "Short Description" || key === "Email" || key === "Phone") return null;
                                const Icon = getIconForField(key);
                                return (
                                    <div key={key} className="flex items-center gap-2">
                                        <Icon className="h-4 w-4  shrink-0" />
                                        <span className="text-sm">
                    <span className="font-medium">{key}:</span> {value}
                  </span>
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
        <div className="flex flex-col gap-6">
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
                            <Avatar className="h-24 w-24 ring-4 ring-primary/20 shadow-md">
                                <AvatarImage src="/user-2.png" alt="Amaad Kareem" />
                                <AvatarFallback className="text-lg font-semibold">AK</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-semibold">Amaad Kareem</CardTitle>
                                <Badge
                                    variant={getStatusVariant("Active")}
                                    className={`px-3 py-1 text-sm rounded-full ${getStatusColor("Active")}`}
                                >
                                    Active
                                </Badge>
                            </div>
                            <Button variant="outline" className="w-full max-w-[200px]" asChild>
                                <Link href="/members">Edit Profile</Link>
                            </Button>
                        </CardHeader>
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

                    <Card>
                        <CardHeader className="xxl:!pb-0">
                            <CardTitle>Upload Images</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-24 w-24 shrink-0 rounded-full bg-muted flex items-center justify-center">
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-2">
                                        <input type="file" id="system-logo" className="hidden" />
                                        <Button variant="outline" onClick={() => document.getElementById("system-logo")?.click()}>Upload Photo</Button>
                                        <p className="text-sm text-muted-foreground">Upload a profile photo. JPG, PNG or GIF. Max 2MB.</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full">
                                Submit
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    <Tabs defaultValue={userProfile[0].id} className="w-full">
                        <TabsList className="flex mb-4">
                            {userProfile.map((tab) => (
                                <TabsTrigger className="px-6 py-2" value={tab.id}>{tab.section}</TabsTrigger>
                            ))}
                        </TabsList>

                        {userProfile.map((tab) => (
                            <TabsContent value={tab.id} className="space-y-6">
                                <Card>
                                    <CardContent>
                                        {renderTabContent(tab)}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
