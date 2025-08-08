"use client";
import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import { Label } from "@/components/client/ux/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/client/ux/select";
import { Textarea } from "@/components/client/ux/textarea";
import { CloudUpload, Upload, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MultiSelectCombobox } from "@/components/client/ux/combo-box";
import { Checkbox } from "@/components/client/ux/checkbox";
import { Slider } from "@/components/client/ux/slider";
import LocationSearchInput from "@/components/client/location-search";
import ImageWrapper from "@/components/client/image-wrapper";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useBasicInfo } from "@/app/admin/(dashboard)/members/_hooks/useBasicInfo";

const tabs = [
  { id: "account-details", label: "Account Details" },
  { id: "language", label: "Languages" },
  { id: "password", label: "Password" },
  { id: "profile-photo", label: "Profile Details" },
  { id: "delete-account", label: "Delete Account" },
];

const languages = [
  { value: "english", label: "English", code: "gb" },
  { value: "dutch", label: "Dutch", code: "nl" },
  { value: "german", label: "German", code: "de" },
  { value: "french", label: "French", code: "fr" },
  { value: "spanish", label: "Spanish", code: "es" },
  { value: "italian", label: "Italian", code: "it" },
];

export function AccountSettings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { user, userLoading } = useBasicInfo(userId);
  console.log(user);
  const defaultTab = "account-details";
  const initialTab = searchParams.get("activeTab") || defaultTab;
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (!searchParams.get("activeTab")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("activeTab", defaultTab);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    firstName: "Lorem Ipsum",
    lastName: "Lorem Ipsum",
    userName: "Lorem Ipsum",
    gender: "",
    birthDate: "Lorem Ipsum",
    email: "Lorem Ipsum",
  });
  const [pfp, setPfp] = useState<string>();
  // Initialize active tab from URL parameter
  useEffect(() => {
    const tabFromUrl = searchParams.get("activeTab");
    if (tabFromUrl && tabs.some((tab) => tab.id === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Update URL with new tab parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set("activeTab", tabId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const personalityTraits = [
    "simpel",
    "rustig",
    "ingetogen",
    "excentriek",
    "redelijk slim",
    "koppig",
    "bescheiden",
    "serieus",
    "spontaan",
    "sensueel",
    "verlegen",
    "artistiek",
    "relaxed",
    "muzikaal",
    "pragmatisch",
    "veel eisend",
    "spiritueel",
    "niet-veel eisend",
    "egoïstisch",
    "humoristisch",
    "scherp",
    "vrijdenkend",
    "recht-door-zee",
    "uitbundig",
    "sloom",
    "conservatief",
    "street smart",
    "narcistisch",
    "praatgraag",
    "altruïstisch",
    "sportief",
    "romantisch",
    "verzorgend",
    "avontuurlijk",
    "intellectueel",
    "werelds",
    "dwangmatig",
  ];

  const [hobbySport, setHobbySport] = useState(["Autospel", "Boksen"]);
  const [hobbyMuziek, setHobbyMuziek] = useState(["R&B", "Rock"]);
  const [hobbyKeuken, setHobbyKeuken] = useState(["Italiaans"]);
  const [hobbyLezen, setHobbyLezen] = useState(["Psychologie"]);
  const [hobbyTv, setHobbyTv] = useState(["Drama"]);

  const toggleTrait = (trait: string) => {
    // stub
    console.log(trait);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPfp(url);
      // Optional: Upload to server
      const formData = new FormData();
      formData.append("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      }).then((res) => console.log("Uploaded", res));
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow drop
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "language":
        return (
          <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-center lg:items-end gap-4">
            <div className="space-y-4 w-full sm:w-1/2 lg:w-2/5">
              <div>
                <Label htmlFor="language" className="">
                  Select Language
                </Label>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        <Image
                          src={`https://flagcdn.com/${language.code}.svg`}
                          width={28}
                          height={28}
                          className="rounded-[2px]"
                          alt={language.code}
                        />
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button variant="theme" size="lg">
              Save
            </Button>
          </div>
        );

      case "password":
        return (
          <div className="flex flex-col gap-8 justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="currentPassword" className="">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    handlePasswordChange("currentPassword", e.target.value)
                  }
                  placeholder="••••••••••••"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="newPassword" className="">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    handlePasswordChange("newPassword", e.target.value)
                  }
                  placeholder="••••••••••••"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    handlePasswordChange("confirmPassword", e.target.value)
                  }
                  placeholder="••••••••••••"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              <Button variant="theme" size="lg" className="ml-auto">
                Save
              </Button>
            </div>
          </div>
        );

      case "delete-account":
        return (
          <div className="max-w-lg mx-auto mt-12">
            <div className="text-center">
              <h2 className="text-2xl font-medium text-gray-900 mb-6">
                Delete Account
              </h2>
              <p className="text-sm mb-8 leading-relaxed font-light">
                Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                Industry. Lorem Ipsum Has Been The Industry&apos;s Standard
                Dummy Text Ever Since The 1500s.
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" size="lg">
                  Cancel
                </Button>
                <Button variant="destructive" size="lg">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        );

      case "profile-photo":
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

            <form className="space-y-10">
              <div>
                <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                  Over mij
                </h3>
                <Textarea
                  placeholder="Vertel iets over jezelf..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-end mt-2">
                  <Button size="lg" variant="theme">
                    Update
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                  Basisinformatie
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Afkomst *</Label>
                    <Select defaultValue="turks">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="turks">Turks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Geslacht *</Label>
                    <Select defaultValue="man">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="man">Man</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Geboortedatum *</Label>
                    <div className="flex gap-2">
                      <Select defaultValue="26">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="26">26</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="september">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="september">September</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="1993">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1993">1993</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Leeftijd</Label>
                    <Input defaultValue="31" />
                  </div>
                  <div>
                    <Label>Religie *</Label>
                    <Select defaultValue="joods">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="joods">Joods</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Relatie</Label>
                    <Select defaultValue="single">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Ik zoek een *</Label>
                    <Select defaultValue="man">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="man">Man</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Kinderen *</Label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button size="lg" variant="theme">
                    Update
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                  Over mij
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Label>Height *</Label>
                    <Slider
                      value={168}
                      onValueChange={() => {}}
                      min={0}
                      max={300}
                      step={1}
                      unit={"cm"}
                      className="mt-8 mb-2"
                    />{" "}
                  </div>{" "}
                  <div className="relative">
                    <Label>Weight *</Label>
                    <Slider
                      value={50}
                      onValueChange={() => {}}
                      min={0}
                      max={300}
                      step={1}
                      unit={"cm"}
                      className="mt-8 mb-2"
                    />{" "}
                  </div>
                  <div>
                    <Label>Kleur van de ogen *</Label>
                    <Select defaultValue="blauw">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blauw">Blauw</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Haarkleur *</Label>
                    <Select defaultValue="bruin">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bruin">Bruin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Bodytype *</Label>
                    <Select defaultValue="tenger">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tenger">Tenger</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Uiterlijk *</Label>
                    <Select defaultValue="zelfverzekerd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zelfverzekerd">
                          Zelfverzekerd
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Kledingstijl(en) *</Label>
                    <Select defaultValue="nonchalant">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nonchalant">Nonchalant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Intelligentie *</Label>
                    <Select defaultValue="hoogste-prioriteit">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hoogste-prioriteit">
                          Hoogste prioriteit
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button size="lg" variant="theme">
                    Update
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                  Hobby&apos;s en interesses
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Sport *</Label>
                    <MultiSelectCombobox
                      selected={hobbySport}
                      options={["Autospel", "Boksen", "Voetbal"]}
                      onChange={setHobbySport}
                    />
                  </div>
                  <div>
                    <Label>Muziek *</Label>
                    <MultiSelectCombobox
                      selected={hobbyMuziek}
                      options={["R&B", "Rock", "Jazz", "House"]}
                      onChange={setHobbyMuziek}
                    />
                  </div>
                  <div>
                    <Label>Keuken *</Label>
                    <MultiSelectCombobox
                      selected={hobbyKeuken}
                      options={["Italiaans", "Grieks", "Indisch"]}
                      onChange={setHobbyKeuken}
                    />
                  </div>
                  <div>
                    <Label>Lezen *</Label>
                    <MultiSelectCombobox
                      selected={hobbyLezen}
                      options={["Psychologie", "Romans"]}
                      onChange={setHobbyLezen}
                    />
                  </div>
                  <div>
                    <Label>Tv-programma&apos;s *</Label>
                    <MultiSelectCombobox
                      selected={hobbyTv}
                      options={["Drama", "Documentaire"]}
                      onChange={setHobbyTv}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button size="lg" variant="theme">
                    Update
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                  Plaats
                </h3>
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="border border-app-border rounded-[5px]">
                    <LocationSearchInput
                      onSelect={(location) => {
                        console.log("Selected location:", location);
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button size="lg" variant="theme">
                    Update
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                  Meer informatie
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Diploma *</Label>
                    <Select defaultValue="">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="middelbaar">Middelbaar</SelectItem>
                        <SelectItem value="hoger">Hoger</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Onderwijs</Label>
                    <Select defaultValue="universitair">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="universitair">
                          Universitair
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Werkende sector *</Label>
                    <Select defaultValue="dienstverlening">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dienstverlening">
                          In de dienstverlening
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Taal *</Label>
                    <Select defaultValue="spaans">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spaans">Spaans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Bekende talen *</Label>
                    <MultiSelectCombobox
                      selected={["Engels", "Spaans"]}
                      options={[
                        "Engels",
                        "Spaans",
                        "Frans",
                        "Duits",
                        "Nederlands",
                      ]}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button size="lg" variant="theme">
                    Update
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                  Levensstijl
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Rook *</Label>
                    <Select defaultValue="ja">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ja">Ja</SelectItem>
                        <SelectItem value="nee">Nee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Drinken *</Label>
                    <Select defaultValue="nee">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nee">Nee</SelectItem>
                        <SelectItem value="ja">Ja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Uitgaan *</Label>
                    <Select defaultValue="nee">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nee">Nee</SelectItem>
                        <SelectItem value="ja">Ja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button size="lg" variant="theme">
                    Update
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                  Gedrag
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {personalityTraits.map((trait) => (
                    <div key={trait} className="flex items-start gap-2">
                      <Checkbox onClick={() => toggleTrait(trait)} />
                      <Label className="capitalize text-sm mb-0">{trait}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <Button size="lg" variant="theme">
                    Update
                  </Button>
                </div>
              </div>
            </form>
          </div>
        );

      default:
        return (
          <div className="flex lg:flex-row flex-col gap-8">
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-[5px] overflow-hidden mb-4">
                {user?.image ? (
                  <ImageWrapper
                    src={user?.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageWrapper
                    src="https://picsum.photos/128"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div
                className={`border-2 border-dashed rounded-[5px] border-gray-200 w-full p-4 text-center transition-colors border-muted-foreground/25`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="flex flex-col items-center space-y-4">
                  <CloudUpload
                    strokeWidth={1.25}
                    className="w-12 h-12 text-app-theme"
                  />
                  <p className="text-xs text-muted-foreground">
                    Drag a photo here
                  </p>
                  <div className="flex items-center space-x-2 w-full">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="text-xs text-gray-300 px-2">OR</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>
                  <div className="w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={() => {}}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="w-full">
                      <Button
                        className="w-full"
                        asChild
                        size="sm"
                        variant="theme"
                      >
                        <span className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Photo
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      value={user?.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="userName">User Name</Label>
                    <Input
                      id="userName"
                      value={user?.username}
                      onChange={(e) =>
                        handleInputChange("userName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="birthDate">Date of Birth</Label>
                    <Input
                      id="birthDate"
                      value={user?.dob}
                      onChange={(e) =>
                        handleInputChange("birthDate", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      value={user?.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={user?.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                    >
                      <SelectTrigger id="gender" className="mt-1" size="sm">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button variant="outline" size="lg">
                  Cancel
                </Button>
                <Button variant="theme" size="lg">
                  Save
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="max-w-screen mx-auto overflow-x-auto border-b-2 border-app-border mb-8">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`pb-2 px-1 text-nowrap text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-app-blue text-app-blue"
                    : "border-transparent text-black hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
}
