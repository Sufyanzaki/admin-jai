"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ArrowLeft, Upload} from "lucide-react";
import Link from "next/link";
import React from "react";

// Sample members data
const userProfile = [
    {
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
        section: "Living",
        data: {
            Country: "Nederland",
            State: "Gelderland",
            City: "'s-Heerenberg"
        }
    },
    {
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
        section: "Education",
        data: {
            Education: "Diploma"
        }
    },
    {
        section: "Career",
        data: {
            Career: "in de techniek"
        }
    },
    {
        section: "Language",
        data: {
            "Mother Tongue": "Hindostaans",
            "Known Languages": "Engels"
        }
    },
    {
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
        section: "Personal Attitude & Behavior",
        data: {
            "Personal Attitude": "romantisch, uitbundig, sloom"
        }
    },
    {
        section: "Life Style",
        data: {
            Smoke: "Ja",
            Drinking: "Nee",
            "Going Out": "Ja"
        }
    },
    {
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

const payment = {
    invoice: {
        id: "INV-2025-001",
        date: "2025-06-01",
        dueDate: "2025-06-15",
        description: "Monthly subscription for premium services.",
        amount: 150.0,
        items: [
            { name: "Premium Plan", quantity: 1, price: 100.0 },
            { name: "Add-on Feature A", quantity: 2, price: 25.0 },
        ],
    },
    amount: 100.0,
};

// Sample time slots

export default function AddAppointmentPage() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center flex-wrap gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/appointments">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Member Overview</h1>
                    <p className="text-muted-foreground">Review essential information about each member and easily</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="space-y-5">
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

                <div className="lg:col-span-2 space-y-5">
                    <div className="flex gap-2 flex-wrap justify-center sm:justify-end">
                        <Button variant="outline">Package</Button>
                        <Button variant="outline">Login As Member</Button>
                        <Button variant="outline">Blocked</Button>
                        <Button variant="outline">Edit</Button>
                        <Button variant="outline">Close</Button>
                    </div>
                    {userProfile.map((section, idx) => (
                        <Card key={idx}>
                            <CardHeader>
                                <CardTitle>{section.section}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                                    {Object.entries(section.data).map(([label, value], index) => (
                                        <div key={index} className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">{label}</span>
                                            <span className="font-medium">{value || "-"}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                </div>
            </div>
        </div>
    );
}
