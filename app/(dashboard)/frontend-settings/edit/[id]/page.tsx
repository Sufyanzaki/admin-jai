"use client"

import AgendaForm from "@/components/frontend-settings/AgendaForm";
import { useSearchParams } from "next/navigation";
import HomeForm from "@/components/frontend-settings/HomeForm";
import HowItWorks from "@/components/frontend-settings/HowItWorks";
import RegistrationForm from "@/components/frontend-settings/RegistrationForm";
import VragenForm from "@/components/frontend-settings/VragenForm";
import ContactForm from "@/components/frontend-settings/ContactForm";
import TOSForm from "@/components/frontend-settings/TOSForm";


export default function SettingPage() {

    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");

    return(
        <>
            {slug === "home" && <HomeForm />}
            {slug === "contact" && <ContactForm />}
            {slug === "agenda" && <AgendaForm />}
            {slug === "how-work" && <HowItWorks />}
            {slug === "registration" && <RegistrationForm />}
            {slug === "veelgestelde-vragen" && <VragenForm />}
            {slug === "terms-and-conditions" && <TOSForm />}
        </>
    )
}
