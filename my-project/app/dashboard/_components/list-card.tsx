import Link from "next/link";
import {Button} from "@/components/client/ux/button";
import ImageWrapper from "@/components/client/image-wrapper";
interface Profile {
  id: string | number;
  name: string;
  age: number;
  location: string;
  image?: string;
  status?: "online" | "offline" | string; // extend as needed
}


export default function ListCard({profile}: {profile: Profile}){
    return (
        <div className="overflow-hidden rounded-[5px] transition-shadow cursor-pointer mb-4">
            <div className="hidden md:flex flex-row py-4">
                <Link href={`/dashboard/search/${profile.id}`}>
                    <div className="relative flex-shrink-0">
                        <ImageWrapper
                            src={profile.image || "/placeholder.svg"}
                            alt={profile.name}
                            className="min-w-40 h-40 object-cover rounded-[5px]"
                        />
                        {profile.status === "online" && (
                            <div className="absolute top-1 right-1 w-3 h-3 bg-app-green rounded-[5px] border-2 border-white"></div>
                        )}
                    </div>
                </Link>
                <div className="flex flex-col px-4 w-full">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className="flex items-start gap-2 mb-2">
                                <div className="flex gap-2 items-center">
                                    <h3 className="font-semibold text-app-blue text-xl">{profile.name}</h3>
                                    <p className="text-xl text-black">
                                        {profile.age}. jaar, {profile.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs px-2 py-1 h-7 bg-transparent"
                                onClick={(e) => e.stopPropagation()}
                            >
                                📧 Bericht
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs px-2 py-1 h-7 bg-transparent"
                                onClick={(e) => e.stopPropagation()}
                            >
                                💝 Interesse
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs px-2 py-1 h-7 bg-transparent"
                                onClick={(e) => e.stopPropagation()}
                            >
                                ⭐ Favoriet
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs px-2 py-1 h-7 bg-transparent"
                                onClick={(e) => e.stopPropagation()}
                            >
                                🚫 Blokkeer
                            </Button>
                        </div>
                    </div>
                    <div className="py-1">
                        <p className="text-sm text-black font-normal mb-3 leading-relaxed">
                            Een jongeman die van gezelligheid houdt en van elk moment van het leven wil genieten. Een echte
                            levensgenieter dus. Ik ben een persoon die alles uit het leven wil halen. Ik ben een spontane, ambitieuze
                            jongeman. Altijd opzoek naar de
                        </p>
                        <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-black">Relatie status</span>
                                <span className="font-normal">: Single - nooit getrouwd</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-black">Religie</span>
                                <span className="text-black">: Hindoe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden p-4">
                <div className="flex gap-3 mb-3">
                    <Link href={`/dashboard/search/${profile.id}`}>
                        <div className="relative flex-shrink-0">
                            <ImageWrapper
                                src={profile.image || "/placeholder.svg"}
                                alt={profile.name}
                                className="w-24 h-24 object-cover rounded-[5px]"
                            />
                            {profile.status === "online" && (
                                <div className="absolute top-1 right-1 w-2 h-2 bg-app-green rounded-[5px] border border-white"></div>
                            )}
                        </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                        <div>
                            <h3 className="font-semibold text-black text-base leading-tight">{profile.name}</h3>
                            <p className="text-xs text-black">
                                {profile.age}. jaar, {profile.location}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-1 mt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs px-2 py-1 h-8 justify-center bg-transparent"
                                onClick={(e) => e.stopPropagation()}
                            >
                                📧 Bericht
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs px-2 py-1 h-8 justify-center bg-transparent"
                                onClick={(e) => e.stopPropagation()}
                            >
                                💝 Interesse
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs px-2 py-1 h-8 justify-center bg-transparent"
                                onClick={(e) => e.stopPropagation()}
                            >
                                ⭐ Favoriet
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs px-2 py-1 h-8 justify-center bg-transparent"
                                onClick={(e) => e.stopPropagation()}
                            >
                                🚫 Blokkeer
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-black font-normal leading-relaxed">
                        Een jongeman die van gezelligheid houdt en van elk moment van het leven wil genieten. Een echte
                        levensgenieter dus. Ik ben een persoon die alles uit het leven wil halen. Ik ben een spontane, ambitieuze
                        jongeman. Altijd opzoek naar de
                    </p>
                </div>
            </div>
        </div>
    )
}