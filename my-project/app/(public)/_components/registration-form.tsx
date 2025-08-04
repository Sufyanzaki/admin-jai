"use client";

import {useState} from "react";
import {Button} from "@/components/client/ux/button";
import {Input} from "@/components/client/ux/input";
import {Card, CardContent, CardHeader} from "@/components/client/ux/card";
import Link from "next/link";
import {FacebookIcon, GoogleIcon} from "@/lib/icons";
import {RadioButtonGroup} from "@/components/client/ux/radio-button-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/client/ux/select"
import { Label } from "@/components/client/ux/label";

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())
const months = [
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December",
]
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString())

export function RegistrationForm() {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedLookingFor, setSelectedLookingFor] = useState<string>("");

    const [selectedDay, setSelectedDay] = useState("")
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedYear, setSelectedYear] = useState("")

  return (
      <Card className="w-full rounded-none max-w-md bg-white">
        <CardHeader className="grid grid-cols-2 gap-4">
          <Button variant="outline" size="lg" className="w-full">
            <div className="flex items-center justify-center space-x-2">
              <GoogleIcon className="w-6 h-6" />
              <span className="font-light">Registreer</span>
            </div>
          </Button>
          <Button variant="outline" size="lg" className="w-full">
            <div className="flex items-center justify-center space-x-2">
              <FacebookIcon className="w-6 h-6" />
              <span className="font-light">Registreer</span>
            </div>
          </Button>
        </CardHeader>

        <CardContent className="px-4 space-y-3">
          <RadioButtonGroup
              name="gender"
              label="Ik ben een:"
              value={selectedGender}
              onChange={setSelectedGender}
              options={[
                { label: "Man", value: "man" },
                { label: "Vrouw", value: "vrouw" },
              ]}
          />

          <RadioButtonGroup
              name="lookingFor"
              label="Ik zoek een:"
              value={selectedLookingFor}
              onChange={setSelectedLookingFor}
              className="grid grid-cols-3 gap-4"
              options={[
                { label: "Man", value: "man" },
                { label: "Vrouw", value: "vrouw" },
                { label: "Beide", value: "Both" },
              ]}
          />

          <Input id="username" label="Gebruikersnaam" className="h-12" />

            <div className="space-y-2">
                <Label>Geboortedatum</Label>
                <div className="grid grid-cols-3 gap-2">
                    <Select value={selectedDay} onValueChange={setSelectedDay}>
                        <SelectTrigger className="h-12">
                            <SelectValue placeholder="Dag" />
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
                            <SelectValue placeholder="Maand" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month, index) => (
                                <SelectItem key={month} value={(index + 1).toString()}>
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="h-12">
                            <SelectValue placeholder="Jaar" />
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
                label="E-mailadres"
                className="h-12"
                placeholder="je@email.com"
            />

            <Input
                id="password"
                type="password"
                label="Wachtwoord"
                className="h-12"
                placeholder="Wachtwoord"
            />
          </div>

          <Button variant="theme" size="lg" asChild className="w-full">
            <Link href="#">Register</Link>
          </Button>

            <p className="w-full text-[#919ba4] text-[12px] font-light leading-[20px]">
                Door &quot;Registreren&quot; te kiezen, ga je akkoord met onze gebruiksvoorwaarden
                (inclusief de verplichte arbitrage van geschillen) en heb je onze
                privacyverklaring begrepen.
            </p>

        </CardContent>
      </Card>

  );
}
