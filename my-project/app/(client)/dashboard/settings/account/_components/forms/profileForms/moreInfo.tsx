import {Label} from "@/components/client/ux/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/client/ux/select";
import {MultiSelectCombobox} from "@/components/client/ux/combo-box";
import {Button} from "@/components/client/ux/button";

export function MoreInfo(){
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                More information
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
    )
}