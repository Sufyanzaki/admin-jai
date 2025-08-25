"use client";

import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import AccountSettingForm from "@/app/(client)/dashboard/settings/account/_components/forms/accountSettingForm";
import LanguageSettingForm from "@/app/(client)/dashboard/settings/account/_components/forms/languageSettingForm";
import PasswordForm from "@/app/(client)/dashboard/settings/account/_components/forms/passwordForm";
import DeleteAccount from "@/app/(client)/dashboard/settings/account/_components/forms/deleteAccount";
import ProfileDetailsForm from "@/app/(client)/dashboard/settings/account/_components/forms/profileDetailsForm";

const tabs = [
  { id: "account-details", label: "Account Details" },
  { id: "language", label: "Languages" },
  { id: "password", label: "Password" },
  { id: "profile-photo", label: "Profile Details" },
  { id: "delete-account", label: "Delete Account" },
];


export function AccountSettings() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = "account-details";
  const initialTab = searchParams.get("activeTab") || defaultTab;
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tabFromUrl = searchParams.get("activeTab");
    const isValidTab = tabFromUrl && tabs.some(tab => tab.id === tabFromUrl);

    if (isValidTab) {
      setActiveTab(tabFromUrl);
    } else {
      setActiveTab(defaultTab);
      const params = new URLSearchParams(searchParams.toString());
      params.set("activeTab", defaultTab);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router, defaultTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("activeTab", tabId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "language":
        return <LanguageSettingForm />

      case "password":
        return <PasswordForm />;

      case "delete-account":
        return <DeleteAccount />;

      case "profile-photo":
        return <ProfileDetailsForm />

      default:
        return <AccountSettingForm />
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
