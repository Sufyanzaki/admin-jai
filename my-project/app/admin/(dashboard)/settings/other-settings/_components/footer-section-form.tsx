import {Label} from "@/components/admin/ui/label";
import {Input} from "@/components/admin/ui/input";
import {MultiOptionSelect} from "@/components/admin/ui/combo-box";
import {DialogFooter} from "@/components/admin/ui/dialog";
import {Button} from "@/components/admin/ui/button";
import {useBasicPages} from "@/app/admin/(dashboard)/frontend-settings/_hooks/useBasicPages";
import Preloader from "@/components/shared/Preloader";
import {useFooterSectionForm} from "@/app/admin/(dashboard)/settings/other-settings/_hooks/useFooterSectionForm";
import { useTranslation } from "react-i18next";

type Props = {
    callback: ()=>void;
}

export default function FooterSectionForm({callback}:Props){
    const { t } = useTranslation();

    const { basicPages, isLoading } = useBasicPages();

    const { register, errors, setValue, watch, handleSubmit, onSubmit, isSubmitting } = useFooterSectionForm();

    if(isLoading){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader/>
                <p className="text-sm">{t("Loading Pages")}</p>
            </div>
        )
    }

    if(!basicPages) return;

    const selectedPages = watch("pageNames") || [];

    const handlePageChange = (newSelection: { title: string; url: string }[]) => {
        setValue("pageNames", newSelection, { shouldValidate: true });
    };

    const customPages = basicPages
        .filter(page => page.type === "custom")
        .map(page => ({
            title: page.Title,
            url: page.Url,
        }));

    return (
        <form onSubmit={handleSubmit(v => onSubmit(v, callback)) }>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="section-name">{t("Section Name")}</Label>
                    <Input
                        id="section-name"
                        placeholder={t("Enter section name")}
                        {...register("sectionName")}
                    />
                    {errors.sectionName && (
                        <p className="text-sm text-red-500">{errors.sectionName.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="section-page">{t("Section Page")}</Label>
                    <MultiOptionSelect
                        options={customPages}
                        selected={selectedPages}
                        onChange={handlePageChange}
                        getLabel={(p) => p.title}
                        getKey={(p) => p.url || p.title}
                    />
                    {errors.pageNames && (
                        <p className="text-sm text-red-500">{errors.pageNames.message}</p>
                    )}
                </div>
            </div>

            <DialogFooter className="mt-4">
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? t("Saving") : t("Save Configuration")}</Button>
            </DialogFooter>
        </form>
    )
}