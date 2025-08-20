"use client";

import {useEffect, useState} from "react";
import {Button} from "@/components/client/ux/button";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {useNewMembers} from "@/app/(client)/(public)/_hooks/useNewMembers";

export default function RecentJoin() {
    const [screenWidth, setScreenWidth] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1);
    const [showSlider, setShowSlider] = useState(false);

    const { users, userLoading } = useNewMembers();

    const members = users.map((u) => ({
        name: `${u.firstName} ${u.lastName}`,
        location: `${u.living?.city}, ${u.living?.city} | ${u.living?.city}` || "",
        image: u.image,
        badge: u.isPremium ? "Gold" : null,
    }));

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setScreenWidth(width);

            let slides = 1;
            if (width >= 1024) {
                slides = 4;
            } else if (width >= 450) {
                slides = 2;
            }

            setSlidesPerView(slides);
            setShowSlider(members.length > slides);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [members.length]);

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slides: {
            perView: slidesPerView,
            spacing: 16,
        },
        loop: true,
        disabled: !showSlider,
    });

    if (userLoading) {
        return (
            <section className="py-4">
                <p className="text-center text-gray-500">Loading new members...</p>
            </section>
        );
    }

    return (
        <section className="py-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-black text-[22px] font-bold xl:text-[32px] capitalize">
                        They Recently Joined!
                    </h2>
                    <h3 className="font-mon">Meet the newest singles near you.</h3>
                </div>
                <Button size="lg" className="text-base font-normal" variant="link">
                    View More
                </Button>
            </div>

            {/* Mobile Slider */}
            <div className="relative sm:hidden">
                <div
                    ref={sliderRef}
                    className={`keen-slider ${
                        !showSlider ? "grid grid-cols-2 md:grid-cols-4 gap-6" : ""
                    }`}
                >
                    {members.map((member, idx) => (
                        <div
                            key={idx}
                            className={`keen-slider__slide ${!showSlider ? "!min-w-0" : ""}`}
                        >
                            <div className="relative rounded-lg overflow-hidden group">
                                <figure className="w-[400px] h-[400px] object-cover">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                </figure>

                                {/* Badge */}
                                {member.badge === "Featured" && (
                                    <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                    Featured
                  </span>
                                )}
                                {member.badge === "Gold" && (
                                    <span className="absolute bottom-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-md font-medium">
                    Gold
                  </span>
                                )}

                                {/* Name and location */}
                                <div className="absolute bottom-2 left-2 text-white text-2xl">
                                    <p className="font-semibold">{member.name}</p>
                                    {member.location && (
                                        <p className="text-sm">{member.location}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showSlider && screenWidth < 1024 && (
                    <div className="flex justify-center mt-4 space-x-2">
                        {Array.from({
                            length: Math.ceil(members.length / slidesPerView),
                        }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => instanceRef.current?.moveToIdx(idx)}
                                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                    idx === (instanceRef.current?.track.details.rel || 0)
                                        ? "bg-pink-500"
                                        : "bg-gray-300"
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}

                {showSlider && screenWidth < 1024 && (
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                            Swipe om meer leden te bekijken
                        </p>
                    </div>
                )}
            </div>

            {/* Default Grid for Medium and Larger Screens */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-6">
                {members.map((member, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden group">
                        <figure className="w-[400px] h-[400px] object-cover">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </figure>

                        {/* Badge */}
                        {member.badge === "Featured" && (
                            <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                Featured
              </span>
                        )}
                        {member.badge === "Gold" && (
                            <span className="absolute bottom-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-md font-medium">
                Gold
              </span>
                        )}

                        {/* Name and location */}
                        <div className="absolute bottom-2 left-2 text-white text-sm">
                            <p className="font-semibold">{member.name}</p>
                            {member.location && <p className="text-xs">{member.location}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
