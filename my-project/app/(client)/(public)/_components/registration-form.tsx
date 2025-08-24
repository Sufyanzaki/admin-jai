"use client";

import { useState } from "react";
import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import { Card, CardContent, CardHeader } from "@/components/client/ux/card";
import Link from "next/link";
import { FacebookIcon, GoogleIcon } from "@/lib/icons";
import { RadioButtonGroup } from "@/components/client/ux/radio-button-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/client/ux/select";
import { Label } from "@/components/client/ux/label";
import { signIn } from "next-auth/react";
import { useTranslation } from "react-i18next";

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

export function RegistrationForm() {
    const { t } = useTranslation();

    const [selectedGender, setSelectedGender] = useState<string>("");
    const [selectedLookingFor, setSelectedLookingFor] = useState<string>("");

    const [selectedDay, setSelectedDay] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    return (
        <Card className="w-full rounded-none max-w-md bg-white">
            <CardHeader className="grid grid-cols-2 gap-4">
                <Button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    variant="outline"
                    size="lg"
                    className="w-full"
                >
                    <div className="flex items-center justify-center space-x-2">
                        <GoogleIcon className="w-6 h-6" />
                        <span className="font-light">{t("Register")}</span>
                    </div>
                </Button>
                <Button
                    onClick={() => signIn("facebook", { callbackUrl: "/" })}
                    variant="outline"
                    size="lg"
                    className="w-full"
                >
                    <div className="flex items-center justify-center space-x-2">
                        <FacebookIcon className="w-6 h-6" />
                        <span className="font-light">{t("Register")}</span>
                    </div>
                </Button>
            </CardHeader>

            <CardContent className="px-4 space-y-3">
                <RadioButtonGroup
                    name="gender"
                    label={t("I am a:")}
                    value={selectedGender}
                    onChange={setSelectedGender}
                    options={[
                        { label: t("Man"), value: "man" },
                        { label: t("Woman"), value: "woman" },
                    ]}
                />

                <RadioButtonGroup
                    name="lookingFor"
                    label={t("I am looking for a:")}
                    value={selectedLookingFor}
                    onChange={setSelectedLookingFor}
                    className="grid grid-cols-3 gap-4"
                    options={[
                        { label: t("Man"), value: "man" },
                        { label: t("Woman"), value: "woman" },
                        { label: t("Both"), value: "both" },
                    ]}
                />

                <Input id="username" label={t("Username")} className="h-12" />

                <div className="space-y-2">
                    <Label>{t("Date of Birth")}</Label>
                    <div className="grid grid-cols-3 gap-2">
                        <Select value={selectedDay} onValueChange={setSelectedDay}>
                            <SelectTrigger className="h-12">
                                <SelectValue placeholder={t("Day")} />
                            </SelectTrigger>
                            <SelectContent>
                                {days.map((day) => (
                                    <SelectItem key={day} value={day}>
                                        {day}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="h-12">
                                <SelectValue placeholder={t("Month")} />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map((month, index) => (
                                    <SelectItem key={month} value={(index + 1).toString()}>
                                        {t(month)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                            <SelectTrigger className="h-12">
                                <SelectValue placeholder={t("Year")} />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((year) => (
                                    <SelectItem key={year} value={year}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <Input
                        id="email"
                        type="email"
                        label={t("Email address")}
                        className="h-12"
                        placeholder="you@email.com"
                    />

                    <Input
                        id="password"
                        type="password"
                        label={t("Password")}
                        className="h-12"
                        placeholder={t("Password")}
                    />
                </div>

                <Button variant="theme" size="lg" asChild className="w-full">
                    <Link href="#">{t("Register")}</Link>
                </Button>

                <p className="w-full text-[#919ba4] text-[12px] font-light leading-[20px]">
                    {t(
                        'By choosing "Register", you agree to our Terms of Use (including mandatory arbitration of disputes) and have understood our Privacy Policy.'
                    )}
                </p>
            </CardContent>
        </Card>
    );
}
