import {Label} from "@/components/client/ux/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/client/ux/select";
import {Button} from "@/components/client/ux/button";

export function LifeStyle(){
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                Lifestyle
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
    )
}