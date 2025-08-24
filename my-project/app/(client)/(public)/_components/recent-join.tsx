"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/client/ux/button";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useNewMembers } from "@/app/(client)/(public)/_hooks/useNewMembers";
import { useTranslation } from "react-i18next";

export default function RecentJoin() {
    const [screenWidth, setScreenWidth] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1);
    const [showSlider, setShowSlider] = useState(false);

    const { users, userLoading } = useNewMembers();
    const { t } = useTranslation();

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
                <p className="text-center text-gray-500">{t("Loading new members...")}</p>
            </section>
        );
    }

    return (
        <section className="py-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-black text-[22px] font-bold xl:text-[32px] capitalize">
                        {t("They Recently Joined!")}
                    </h2>
                    <h3 className="font-mon">{t("Meet the newest singles near you.")}</h3>
                </div>
                <Button size="lg" className="text-base font-normal" variant="link">
                    {t("View More")}
                </Button>
            </div>

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
                                <figure className="w-[400px] h-[400px] object-cover relative">
                                    <div className="absolute inset-0 bg-black/20" />
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </figure>

                                {/* Badge */}
                                {member.badge === "Featured" && (
                                    <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                    {t("Featured")}
                  </span>
                                )}
                                {member.badge === "Gold" && (
                                    <span className="absolute bottom-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-md font-medium">
                    {t("Gold")}
                  </span>
                                )}

                                <div className="absolute bottom-2 left-2 text-white text-2xl">
                                    <p className="font-semibold">{member.name}</p>
                                    {member.location && (
                                        <p className="text-m">{member.location}</p>
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
                                aria-label={t("Go to slide {{number}}", { number: idx + 1 })}
                            />
                        ))}
                    </div>
                )}

                {showSlider && screenWidth < 1024 && (
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                            {t("Swipe to view more members")}
                        </p>
                    </div>
                )}
            </div>

            <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-6">
                {members.map((member, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden group">
                        <figure className="w-[400px] h-[400px] object-cover relative">
                            <div className="absolute inset-0 bg-black/20" />
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </figure>

                        {member.badge === "Featured" && (
                            <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                {t("Featured")}
              </span>
                        )}
                        {member.badge === "Gold" && (
                            <span className="absolute bottom-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-md font-medium">
                {t("Gold")}
              </span>
                        )}

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
