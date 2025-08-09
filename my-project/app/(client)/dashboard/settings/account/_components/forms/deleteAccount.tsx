import {Button} from "@/components/client/ux/button";

export default function DeleteAccount(){
    return (
        <div className="max-w-lg mx-auto mt-12">
            <div className="text-center">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">
                    Delete Account
                </h2>
                <p className="text-sm mb-8 leading-relaxed font-light">
                    Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                    Industry. Lorem Ipsum Has Been The Industry&apos;s Standard
                    Dummy Text Ever Since The 1500s.
                </p>
                <div className="flex justify-center gap-3">
                    <Button variant="outline" size="lg">
                        Cancel
                    </Button>
                    <Button variant="destructive" size="lg">
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}