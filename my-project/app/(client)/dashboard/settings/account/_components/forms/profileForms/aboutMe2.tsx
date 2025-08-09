import {Label} from "@/components/client/ux/label";
import {Slider} from "@/components/client/ux/slider";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/client/ux/select";
import {Button} from "@/components/client/ux/button";

export function AboutMe2(){
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                About Me
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
    )
}