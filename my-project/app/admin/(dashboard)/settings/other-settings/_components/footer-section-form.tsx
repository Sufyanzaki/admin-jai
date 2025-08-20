import {Label} from "@/components/admin/ui/label";
import {Input} from "@/components/admin/ui/input";
import {MultiOptionSelect} from "@/components/admin/ui/combo-box";
import {DialogFooter} from "@/components/admin/ui/dialog";
import {Button} from "@/components/admin/ui/button";
import {useBasicPages} from "@/app/admin/(dashboard)/frontend-settings/_hooks/useBasicPages";
import Preloader from "@/components/shared/Preloader";
import {useFooterSectionForm} from "@/app/admin/(dashboard)/settings/other-settings/_hooks/useFooterSectionForm";

export default function FooterSectionForm(){

    const { basicPages, isLoading } = useBasicPages();

    const {} = useFooterSectionForm();

    if(isLoading){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader/>
                <p className="text-sm">Loading Pages</p>
            </div>
        )
    }

    if(!basicPages) return;

    const handlePageChange = (newSelection: { title: string; url: string }[]) => {
        // setValue("sectionPage", newSelection);
    };

    const customPages = basicPages
        .filter(page => page.type === "custom")
        .map(page => ({
            title: page.Title,
            url: page.Url,
        }));

    return (
        <>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="section-name">Section Name</Label>
                    <Input id="section-name" placeholder="Enter name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="section-page">Section Page</Label>
                    <MultiOptionSelect
                        options={customPages}
                        selected={[]}
                        onChange={handlePageChange}
                        getLabel={(p) => p.title}
                        getKey={(p) => p.url || p.title}
                    />
                </div>
            </div>

            <DialogFooter className="mt-4">
                <Button type="submit">Save Configuration</Button>
            </DialogFooter>
        </>
    )
}