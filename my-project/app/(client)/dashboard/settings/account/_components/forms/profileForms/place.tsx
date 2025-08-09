import LocationSearchInput from "@/components/client/location-search";
import {Button} from "@/components/client/ux/button";

export function Place(){
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                Place
            </h3>
            <div className="grid md:grid-cols-1 gap-4">
                <div className="border border-app-border rounded-[5px]">
                    <LocationSearchInput
                        onSelect={(location) => {
                            console.log("Selected location:", location);
                        }}
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