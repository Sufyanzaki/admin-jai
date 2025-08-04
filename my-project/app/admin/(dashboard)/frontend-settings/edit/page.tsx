"use client"

import AgendaForm from "@/components/admin/frontend-settings/AgendaForm";
import { useSearchParams } from "next/navigation";
import HomeForm from "@/components/admin/frontend-settings/HomeForm";
import HowItWorks from "@/components/admin/frontend-settings/HowItWorks";
import RegistrationForm from "@/components/admin/frontend-settings/RegistrationForm";
import VragenForm from "@/components/admin/frontend-settings/VragenForm";
import ContactForm from "@/components/admin/frontend-settings/ContactForm";
import TOSForm from "@/components/admin/frontend-settings/TOSForm";


export default function SettingPage() {

    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");

    return(
        <>
            {slug === "homepage" && <HomeForm />}
            {slug === "contact" && <ContactForm />}
            {slug === "agenda" && <AgendaForm />}
            {slug === "how-it-works" && <HowItWorks />}
            {slug === "registration" && <RegistrationForm />}
            {slug === "vee" && <VragenForm />}
            {slug === "terms" && <TOSForm />}
        </>
    )
}
