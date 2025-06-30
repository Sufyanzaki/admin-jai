"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {ArrowLeft, Badge, Mail, Upload, X} from "lucide-react";
import Link from "next/link";
import {useEffect, useState} from "react";
import {MultiSelectCombobox} from "@/components/ui/combo-box";

interface InterestSection {
  id: string
  label: string
  selected: string[]
  options: string[]
}

interface LocationData {
  countries: string[]
  states: Record<string, string[]>
  cities: Record<string, Record<string, string[]>>
}

export default function AddMemberPage() {
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(new Date());
  const [interests, setInterests] = useState<InterestSection[]>([
    {
      id: "sports",
      label: "Sports",
      selected: ["Rugby", "Autosport"],
      options: [
        "Rugby",
        "Autosport",
        "Football",
        "Basketball",
        "Tennis",
        "Swimming",
        "Cricket",
        "Baseball",
        "Hockey",
        "Golf",
      ],
    },
    {
      id: "music",
      label: "Music",
      selected: ["blues"],
      options: ["blues", "Rock", "Pop", "Jazz", "Classical", "Hip Hop", "Country", "Electronic", "R&B", "Reggae"],
    },
    {
      id: "kitchen",
      label: "Kitchen",
      selected: ["Mexicaans"],
      options: [
        "Mexicaans",
        "Italian",
        "Chinese",
        "Indian",
        "French",
        "Thai",
        "Japanese",
        "Mediterranean",
        "American",
        "Korean",
      ],
    },
    {
      id: "reading",
      label: "Reading",
      selected: ["Familie-en streekromans"],
      options: [
        "Familie-en streekromans",
        "Mystery",
        "Romance",
        "Science Fiction",
        "Fantasy",
        "Biography",
        "History",
        "Self-help",
        "Poetry",
        "Thriller",
      ],
    },
    {
      id: "tvshows",
      label: "TV Shows",
      selected: ["Drama"],
      options: [
        "Drama",
        "Comedy",
        "Action",
        "Horror",
        "Documentary",
        "Reality TV",
        "Sci-Fi",
        "Crime",
        "Romance",
        "Animation",
      ],
    },
  ])

  const [motherTongue, setMotherTongue] = useState("Hindostaans")
  const [knownLanguages, setKnownLanguages] = useState<string[]>(["Engels"])

  const languageOptions = [
    "Engels", // English
    "Nederlands", // Dutch
    "Duits", // German
    "Frans", // French
    "Spaans", // Spanish
    "Italiaans", // Italian
    "Portugees", // Portuguese
    "Russisch", // Russian
    "Chinees", // Chinese
    "Japans", // Japanese
    "Arabisch", // Arabic
    "Hindi",
    "Urdu",
    "Turks", // Turkish
    "Grieks", // Greek
    "Pools", // Polish
    "Zweeds", // Swedish
    "Noors", // Norwegian
    "Fins", // Finnish
    "Deens", // Danish
  ]

  const motherTongueOptions = [
    "Hindostaans",
    "Nederlands", // Dutch
    "Engels", // English
    "Duits", // German
    "Frans", // French
    "Spaans", // Spanish
    "Italiaans", // Italian
    "Portugees", // Portuguese
    "Russisch", // Russian
    "Chinees", // Chinese
    "Japans", // Japanese
    "Arabisch", // Arabic
    "Hindi",
    "Urdu",
    "Turks", // Turkish
  ]

  const [country, setCountry] = useState<string>("Nederland")
  const [state, setState] = useState<string>("Gelderland")
  const [city, setCity] = useState<string>("'s-Heerenberg")

  // Available states based on selected country
  const [availableStates, setAvailableStates] = useState<string[]>([])
  // Available cities based on selected country and state
  const [availableCities, setAvailableCities] = useState<string[]>([])

  // Sample location data - in a real app, this would come from an API
  const locationData: LocationData = {
    countries: ["Nederland", "België", "Duitsland", "Frankrijk", "Verenigd Koninkrijk"],
    states: {
      Nederland: [
        "Gelderland",
        "Noord-Holland",
        "Zuid-Holland",
        "Utrecht",
        "Limburg",
        "Noord-Brabant",
        "Overijssel",
        "Drenthe",
        "Groningen",
        "Friesland",
        "Zeeland",
        "Flevoland",
      ],
      België: [
        "Antwerpen",
        "Oost-Vlaanderen",
        "West-Vlaanderen",
        "Vlaams-Brabant",
        "Limburg",
        "Henegouwen",
        "Luik",
        "Namen",
        "Luxemburg",
        "Waals-Brabant",
      ],
      Duitsland: ["Noordrijn-Westfalen", "Beieren", "Baden-Württemberg", "Nedersaksen", "Hessen"],
      Frankrijk: ["Île-de-France", "Auvergne-Rhône-Alpes", "Hauts-de-France", "Grand Est", "Occitanie"],
      "Verenigd Koninkrijk": ["Engeland", "Schotland", "Wales", "Noord-Ierland"],
    },
    cities: {
      Nederland: {
        Gelderland: ["Arnhem", "Nijmegen", "Apeldoorn", "Ede", "Doetinchem", "'s-Heerenberg", "Zutphen", "Harderwijk"],
        "Noord-Holland": ["Amsterdam", "Haarlem", "Zaanstad", "Alkmaar", "Hoorn", "Den Helder"],
        "Zuid-Holland": ["Rotterdam", "Den Haag", "Leiden", "Dordrecht", "Gouda", "Delft"],
        Utrecht: ["Utrecht", "Amersfoort", "Veenendaal", "Nieuwegein", "Zeist"],
        Limburg: ["Maastricht", "Venlo", "Sittard", "Roermond", "Weert"],
      },
      België: {
        Antwerpen: ["Antwerpen", "Mechelen", "Turnhout", "Lier", "Mol"],
        "Oost-Vlaanderen": ["Gent", "Aalst", "Sint-Niklaas", "Dendermonde", "Oudenaarde"],
        "West-Vlaanderen": ["Brugge", "Oostende", "Kortrijk", "Roeselare", "Ieper"],
      },
      Duitsland: {
        "Noordrijn-Westfalen": ["Keulen", "Düsseldorf", "Dortmund", "Essen", "Duisburg", "Bochum"],
        Beieren: ["München", "Neurenberg", "Augsburg", "Regensburg", "Würzburg"],
      },
    },
  }

  // Update available states when country changes
  useEffect(() => {
    if (country) {
      const states = locationData.states[country] || []
      setAvailableStates(states)

      // Reset state and city if current selections are invalid
      if (states.length > 0) {
        if (!states.includes(state)) {
          setState(states[0])
          setCity("")
        }
      } else {
        setState("")
        setCity("")
      }
    } else {
      setAvailableStates([])
      setState("")
      setCity("")
    }
  }, [country, state])

  // Update available cities when country or state changes
  useEffect(() => {
    if (country && state) {
      const cities = locationData.cities[country]?.[state] || []
      setAvailableCities(cities)

      // Reset city if current selection is invalid
      if (cities.length > 0) {
        if (!cities.includes(city)) {
          setCity(cities[0])
        }
      } else {
        setCity("")
      }
    } else {
      setAvailableCities([])
      setCity("")
    }
  }, [country, state, city])

  const [length, setLength] = useState("2.05")
  const [eyeColor, setEyeColor] = useState("Groen")
  const [hairColor, setHairColor] = useState("Grijs")
  const [bodyType, setBodyType] = useState("Tenger")
  const [weight, setWeight] = useState("68")
  const [appearance, setAppearance] = useState("Sprankelend")
  const [clothingStyles, setClothingStyles] = useState("Casual")
  const [intelligence, setIntelligence] = useState("Geen prioriteit")
  const [languages, setLanguages] = useState<string[]>([])

  const lengthOptions = [
    "1.50",
    "1.55",
    "1.60",
    "1.65",
    "1.70",
    "1.75",
    "1.80",
    "1.85",
    "1.90",
    "1.95",
    "2.00",
    "2.05",
    "2.10",
  ]

  const eyeColorOptions = ["Groen", "Blauw", "Bruin", "Grijs", "Hazelnoot", "Amber", "Zwart"]

  const hairColorOptions = ["Grijs", "Blond", "Bruin", "Zwart", "Rood", "Auburn", "Zilver", "Wit", "Kaal"]

  const bodyTypeOptions = ["Tenger", "Slank", "Atletisch", "Gemiddeld", "Mollig", "Groot", "Gespierd"]

  const appearanceOptions = ["Sprankelend", "Aantrekkelijk", "Gemiddeld", "Knap", "Mooi", "Charmant", "Elegant"]

  const clothingStyleOptions = [
    "Casual",
    "Formeel",
    "Sportief",
    "Trendy",
    "Klassiek",
    "Bohemian",
    "Vintage",
    "Minimalistisch",
  ]

  const intelligenceOptions = [
    "Geen prioriteit",
    "Zeer belangrijk",
    "Belangrijk",
    "Gemiddeld belangrijk",
    "Niet belangrijk",
  ]

  return (
    <div className="flex flex-col gap-5 p-4 xl:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/members">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="space-y-2">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Add Member</h1>
          <p className="text-muted-foreground">Add a new member to your app.</p>
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Basic Information</TabsTrigger>
          <TabsTrigger value="professional">Education & Career</TabsTrigger>
          <TabsTrigger value="behavior">Personality & Behavior</TabsTrigger>
          <TabsTrigger value="patner">Partner Expectation</TabsTrigger>
          <TabsTrigger value="life_style">Life Style</TabsTrigger>
          <TabsTrigger value="hobbies">Hobbies & Interest</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="living">Living</TabsTrigger>
          <TabsTrigger value="about_me">About Me</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Enter your personal details.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Profile Photo + Basic Info */}
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="flex h-32 w-32 items-center justify-center rounded-md border border-dashed">
                  <label htmlFor="profile-photo" className="flex flex-col items-center space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <input type="file" id="profile-photo" className="hidden" />
                    <span className="text-xs text-muted-foreground">Upload photo</span>
                  </label>
                </div>
                <div className="grid flex-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Enter last name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-of-birth">Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <span>{appointmentDate ? appointmentDate.toDateString() : "Pick a date"}</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={appointmentDate} onSelect={setAppointmentDate} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="Enter email" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input id="origin" placeholder="Enter origin" />
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Man">Man</SelectItem>
                      <SelectItem value="Vrouw">Vrouw</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" placeholder="Enter age" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relation">Relation Status</Label>
                  <Select>
                    <SelectTrigger id="relation">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single - nooit getrouwd</SelectItem>
                      <SelectItem value="divorced">Gescheiden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="children">Children</Label>
                  <Select>
                    <SelectTrigger id="children">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geen">Geen</SelectItem>
                      <SelectItem value="ja">Ja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Select>
                    <SelectTrigger id="religion">
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rk">Rooms Katholiek</SelectItem>
                      <SelectItem value="islam">Islam</SelectItem>
                      <SelectItem value="hindu">Hindu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="looking-for">Am Looking For</Label>
                  <Select>
                    <SelectTrigger id="looking-for">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vrouw">Vrouw</SelectItem>
                      <SelectItem value="man">Man</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                    id="description"
                    placeholder="Introduce yourself briefly. Minimum 100 characters."
                    className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

        </TabsContent>
        <TabsContent value="professional" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>
                Enter the member’s occupation, education, and other professional background details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="specialization">Primary Specialization</Label>
                    <Select>
                      <SelectTrigger id="specialization">
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="general">General Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="secondary-specialization">Secondary Specialization (Optional)</Label>
                    <Select>
                      <SelectTrigger id="secondary-specialization">
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="general">General Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualifications">Qualifications</Label>
                  <Textarea id="qualifications" placeholder="Enter qualifications (MD, PhD, etc.)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" placeholder="Enter years of experience" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Education & Training</h3>
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Textarea id="education" placeholder="Enter education details" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Textarea id="certifications" placeholder="Enter certifications" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Department & Position</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="general">General Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select>
                      <SelectTrigger id="position">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="head">Department Head</SelectItem>
                        <SelectItem value="senior">Senior Doctor</SelectItem>
                        <SelectItem value="specialist">Specialist</SelectItem>
                        <SelectItem value="resident">Resident</SelectItem>
                        <SelectItem value="intern">Intern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="behavior" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personality Traits</CardTitle>
              <CardDescription>
                Select traits that best describe the member’s personality, lifestyle, and values.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "simpel", "muzikaal", "conservatief",
                  "rustig", "pragmatisch", "street smart",
                  "ingetogen", "veeleisend", "narcistisch",
                  "excentriek", "spiritueel", "praatgraag",
                  "redelijk slim", "niet-veeleisend", "altruïstisch",
                  "koppig", "egoïstisch", "sportief",
                  "bescheiden", "humoristisch", "romantisch",
                  "serieus", "scherp", "verzorgend",
                  "spontaan", "vrijdenkend", "avontuurlijk",
                  "sensueel", "recht-door-zee", "intellectueel",
                  "verlegen", "uitbundig", "werelds",
                  "artistiek", "sloom", "dwangmatig",
                  "relaxed"
                ].map((trait, index) => (
                    <div key={index} className="flex items-center gap-6">
                      <Switch id={`trait-${index}`} />
                      <Label htmlFor={`trait-${index}`} className="capitalize">
                        {trait}
                      </Label>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </TabsContent>
        <TabsContent value="patner" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Complete your profile details below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin</Label>
                    <Select>
                      <SelectTrigger id="origin">
                        <SelectValue placeholder="Hindostaans" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hindostaans">Hindostaans</SelectItem>
                        <SelectItem value="european">European</SelectItem>
                        <SelectItem value="african">African</SelectItem>
                        <SelectItem value="asian">Asian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="length">Length</Label>
                    <Select>
                      <SelectTrigger id="length">
                        <SelectValue placeholder="1.70" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.50">1.50</SelectItem>
                        <SelectItem value="1.60">1.60</SelectItem>
                        <SelectItem value="1.70">1.70</SelectItem>
                        <SelectItem value="1.80">1.80</SelectItem>
                        <SelectItem value="1.90">1.90</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relation-status">Relation Status</Label>
                    <Select>
                      <SelectTrigger id="relation-status">
                        <SelectValue placeholder="Single - nooit getrouwd" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single - nooit getrouwd</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                        <SelectItem value="separated">Separated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input id="weight" type="number" placeholder="67" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="drinking">Drinking</Label>
                    <Select>
                      <SelectTrigger id="drinking">
                        <SelectValue placeholder="Nee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nee">Nee</SelectItem>
                        <SelectItem value="ja">Ja</SelectItem>
                        <SelectItem value="occasionally">Occasionally</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="looking-for">Am Looking for</Label>
                    <Select>
                      <SelectTrigger id="looking-for">
                        <SelectValue placeholder="Man" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="man">Man</SelectItem>
                        <SelectItem value="woman">Woman</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="religion">Religion</Label>
                    <Select>
                      <SelectTrigger id="religion">
                        <SelectValue placeholder="Moslim" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moslim">Moslim</SelectItem>
                        <SelectItem value="christian">Christian</SelectItem>
                        <SelectItem value="hindu">Hindu</SelectItem>
                        <SelectItem value="buddhist">Buddhist</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Select>
                      <SelectTrigger id="education">
                        <SelectValue placeholder="Basis school" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basis-school">Basis school</SelectItem>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="college">College</SelectItem>
                        <SelectItem value="university">University</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smoke">Smoke</Label>
                    <Select>
                      <SelectTrigger id="smoke">
                        <SelectValue placeholder="Ja" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ja">Ja</SelectItem>
                        <SelectItem value="nee">Nee</SelectItem>
                        <SelectItem value="occasionally">Occasionally</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="going-out">Going Out</Label>
                    <Select>
                      <SelectTrigger id="going-out">
                        <SelectValue placeholder="Ja" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ja">Ja</SelectItem>
                        <SelectItem value="nee">Nee</SelectItem>
                        <SelectItem value="sometimes">Sometimes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Age Range</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-age">From Age</Label>
                    <Input id="from-age" type="number" placeholder="20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-age">To Age</Label>
                    <Input id="to-age" type="number" placeholder="35" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="American Samoa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="american-samoa">American Samoa</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="california">California</SelectItem>
                        <SelectItem value="texas">Texas</SelectItem>
                        <SelectItem value="florida">Florida</SelectItem>
                        <SelectItem value="new-york">New York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Select>
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="los-angeles">Los Angeles</SelectItem>
                      <SelectItem value="san-francisco">San Francisco</SelectItem>
                      <SelectItem value="san-diego">San Diego</SelectItem>
                      <SelectItem value="sacramento">Sacramento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="life_style" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Complete your profile details below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Lifestyle Habits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smoke">Smoke</Label>
                  <Select>
                    <SelectTrigger id="smoke">
                      <SelectValue placeholder="Ja" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ja">Ja</SelectItem>
                      <SelectItem value="nee">Nee</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                      <SelectItem value="socially">Socially</SelectItem>
                      <SelectItem value="trying-to-quit">Trying to quit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drinking">Drinking</Label>
                  <Select>
                    <SelectTrigger id="drinking">
                      <SelectValue placeholder="Nee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nee">Nee</SelectItem>
                      <SelectItem value="ja">Ja</SelectItem>
                      <SelectItem value="socially">Socially</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                      <SelectItem value="regularly">Regularly</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="going-out">Going Out</Label>
                  <Select>
                    <SelectTrigger id="going-out">
                      <SelectValue placeholder="Ja" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ja">Ja</SelectItem>
                      <SelectItem value="nee">Nee</SelectItem>
                      <SelectItem value="weekends-only">Weekends only</SelectItem>
                      <SelectItem value="rarely">Rarely</SelectItem>
                      <SelectItem value="frequently">Frequently</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* Additional Lifestyle */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Lifestyle</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="exercise">Exercise</Label>
                    <Select>
                      <SelectTrigger id="exercise">
                        <SelectValue placeholder="Select exercise frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="regularly">Regularly (3–5 times/week)</SelectItem>
                        <SelectItem value="occasionally">Occasionally (1–2 times/week)</SelectItem>
                        <SelectItem value="rarely">Rarely</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diet">Diet</Label>
                    <Select>
                      <SelectTrigger id="diet">
                        <SelectValue placeholder="Select diet preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="omnivore">Omnivore</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="pescatarian">Pescatarian</SelectItem>
                        <SelectItem value="keto">Keto</SelectItem>
                        <SelectItem value="paleo">Paleo</SelectItem>
                        <SelectItem value="halal">Halal</SelectItem>
                        <SelectItem value="kosher">Kosher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pets">Pets</Label>
                    <Select>
                      <SelectTrigger id="pets">
                        <SelectValue placeholder="Select pet preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="love-pets">Love pets</SelectItem>
                        <SelectItem value="have-pets">Have pets</SelectItem>
                        <SelectItem value="allergic">Allergic to pets</SelectItem>
                        <SelectItem value="no-pets">Don't like pets</SelectItem>
                        <SelectItem value="want-pets">Want pets in future</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="travel">Travel</Label>
                    <Select>
                      <SelectTrigger id="travel">
                        <SelectValue placeholder="Select travel frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frequent">Frequent traveler</SelectItem>
                        <SelectItem value="occasional">Occasional traveler</SelectItem>
                        <SelectItem value="rare">Rarely travel</SelectItem>
                        <SelectItem value="love-travel">Love to travel</SelectItem>
                        <SelectItem value="homebody">Prefer staying home</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="social-media">Social Media</Label>
                    <Select>
                      <SelectTrigger id="social-media">
                        <SelectValue placeholder="Select social media usage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-active">Very active</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="moderate">Moderate use</SelectItem>
                        <SelectItem value="minimal">Minimal use</SelectItem>
                        <SelectItem value="none">Don't use social media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="work-life-balance">Work-Life Balance</Label>
                    <Select>
                      <SelectTrigger id="work-life-balance">
                        <SelectValue placeholder="Select work-life balance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent balance</SelectItem>
                        <SelectItem value="good">Good balance</SelectItem>
                        <SelectItem value="working-on-it">Working on it</SelectItem>
                        <SelectItem value="work-focused">Work-focused</SelectItem>
                        <SelectItem value="life-focused">Life-focused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="night-life">Night Life</Label>
                    <Select>
                      <SelectTrigger id="night-life">
                        <SelectValue placeholder="Select night life preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="love-nightlife">Love nightlife</SelectItem>
                        <SelectItem value="occasional">Occasional nights out</SelectItem>
                        <SelectItem value="quiet-evenings">Prefer quiet evenings</SelectItem>
                        <SelectItem value="early-bird">Early bird</SelectItem>
                        <SelectItem value="night-owl">Night owl</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hobbies">Primary Hobby</Label>
                    <Select>
                      <SelectTrigger id="hobbies">
                        <SelectValue placeholder="Select primary hobby" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="reading">Reading</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="art">Art & Creativity</SelectItem>
                        <SelectItem value="cooking">Cooking</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="outdoor">Outdoor activities</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="photography">Photography</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>

          </Card>
        </TabsContent>
        <TabsContent value="hobbies" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Interests & Preferences</CardTitle>
              <CardDescription>Select your interests in different categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {interests.map((section) => (
                  <div key={section.id} className="space-y-3">
                    <Label className="text-base font-medium">{section.label}*</Label>
                    <MultiSelectCombobox
                        options={section.options}
                        selected={section.selected}
                        onChange={(selected) => {
                          setInterests((prev) => prev.map((s) => (s.id === section.id ? { ...s, selected } : s)))
                        }}
                    />
                  </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="languages" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
              <CardDescription>Select your interests in different categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mother-tongue" className="text-base font-medium">
                    Mother Tongue *
                  </Label>
                  <Select value={motherTongue} onValueChange={setMotherTongue}>
                    <SelectTrigger id="mother-tongue" className="w-full">
                      <SelectValue placeholder="Select your mother tongue" />
                    </SelectTrigger>
                    <SelectContent>
                      {motherTongueOptions.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="known-languages" className="text-base font-medium">
                    Known Languages *
                  </Label>
                  <MultiSelectCombobox
                      options={languageOptions.filter((lang) => lang !== motherTongue)}
                      selected={knownLanguages}
                      onChange={setKnownLanguages}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="living" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="">
              <CardTitle>Location</CardTitle>
              <CardDescription className="text-slate-300">Where are you located?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-base font-medium">
                    Country *
                  </Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger id="country" className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationData.countries.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-base font-medium">
                    State *
                  </Label>
                  <Select value={state} onValueChange={setState} disabled={availableStates.length === 0}>
                    <SelectTrigger id="state" className="w-full">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStates.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-base font-medium">
                    City *
                  </Label>
                  <Select value={city} onValueChange={setCity} disabled={availableCities.length === 0}>
                    <SelectTrigger id="city" className="w-full">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCities.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="about_me" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="">
              <CardTitle>Physical Characteristics</CardTitle>
              <CardDescription className="text-slate-300">
                Tell us about your physical attributes and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="length" className="text-base font-medium">
                      Length *
                    </Label>
                    <Select value={length} onValueChange={setLength}>
                      <SelectTrigger id="length">
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        {lengthOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hair-color" className="text-base font-medium">
                      Hair Color *
                    </Label>
                    <Select value={hairColor} onValueChange={setHairColor}>
                      <SelectTrigger id="hair-color">
                        <SelectValue placeholder="Select hair color" />
                      </SelectTrigger>
                      <SelectContent>
                        {hairColorOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-base font-medium">
                      Weight *
                    </Label>
                    <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter weight"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clothing-styles" className="text-base font-medium">
                      Clothing Styles *
                    </Label>
                    <Select value={clothingStyles} onValueChange={setClothingStyles}>
                      <SelectTrigger id="clothing-styles">
                        <SelectValue placeholder="Select clothing style" />
                      </SelectTrigger>
                      <SelectContent>
                        {clothingStyleOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="eye-color" className="text-base font-medium">
                      Eye Color *
                    </Label>
                    <Select value={eyeColor} onValueChange={setEyeColor}>
                      <SelectTrigger id="eye-color">
                        <SelectValue placeholder="Select eye color" />
                      </SelectTrigger>
                      <SelectContent>
                        {eyeColorOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body-type" className="text-base font-medium">
                      Body Type *
                    </Label>
                    <Select value={bodyType} onValueChange={setBodyType}>
                      <SelectTrigger id="body-type">
                        <SelectValue placeholder="Select body type" />
                      </SelectTrigger>
                      <SelectContent>
                        {bodyTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appearance" className="text-base font-medium">
                      Appearance *
                    </Label>
                    <Select value={appearance} onValueChange={setAppearance}>
                      <SelectTrigger id="appearance">
                        <SelectValue placeholder="Select appearance" />
                      </SelectTrigger>
                      <SelectContent>
                        {appearanceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="intelligence" className="text-base font-medium">
                      Intelligence *
                    </Label>
                    <Select value={intelligence} onValueChange={setIntelligence}>
                      <SelectTrigger id="intelligence">
                        <SelectValue placeholder="Select intelligence preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {intelligenceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Full Width Languages Field */}
              <div className="space-y-2">
                <Label htmlFor="languages" className="text-base font-medium">
                  Languages *
                </Label>
                <MultiSelectCombobox options={languageOptions} selected={languages} onChange={setLanguages} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Update</Button>
      </div>
    </div>
  );
}
