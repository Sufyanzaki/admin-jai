import {Label} from "@/components/client/ux/label";
import {MultiSelectCombobox} from "@/components/client/ux/combo-box";
import {Button} from "@/components/client/ux/button";
import {useState} from "react";

export function HobbyInterest(){

    const [hobbySport, setHobbySport] = useState(["Autospel", "Boksen"]);
    const [hobbyMuziek, setHobbyMuziek] = useState(["R&B", "Rock"]);
    const [hobbyKeuken, setHobbyKeuken] = useState(["Italiaans"]);
    const [hobbyLezen, setHobbyLezen] = useState(["Psychologie"]);
    const [hobbyTv, setHobbyTv] = useState(["Drama"]);


    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                Hobby and Interests
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
    )
}