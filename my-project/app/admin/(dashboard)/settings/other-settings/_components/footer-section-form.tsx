import {Label} from "@/components/admin/ui/label";
import {Input} from "@/components/admin/ui/input";
import {MultiSelectCombobox} from "@/components/admin/ui/combo-box";
import {DialogFooter} from "@/components/admin/ui/dialog";
import {Button} from "@/components/admin/ui/button";
import {useBasicPages} from "@/app/admin/(dashboard)/frontend-settings/_hooks/useBasicPages";
import Preloader from "@/components/admin/ui/Preloader";

export default function FooterSectionForm(){

    const { basicPages, isLoading } = useBasicPages();

    if(isLoading){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader/>
                <p className="text-sm">Loading Pages</p>
            </div>
        )
    }

    const pagesToShow = basicPages?.map(page => page.Title) ?? [];

    return (
        <>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="section-name">Section Name</Label>
                    <Input id="section-name" placeholder="Enter name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="section-page">Section Page</Label>
                    <MultiSelectCombobox
                        options={pagesToShow}
                        selected={pagesToShow}
                        onChange={()=>{}}
                    />
                </div>
            </div>

            <DialogFooter className="mt-4">
                <Button type="submit">Save Configuration</Button>
            </DialogFooter>
        </>
    )
}