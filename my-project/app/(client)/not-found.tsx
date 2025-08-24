'use client'
import { Button } from "@/components/client/ux/button";
import { Home } from "lucide-react";
import ImageWrapper from "@/components/client/image-wrapper";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-white">
            <div className="relative mb-2 lg:mb-12">
                <ImageWrapper
                    src="/assets/oops.png"
                    alt={t("Oops")}
                    width={450}
                    height={200}
                    priority
                />
                <div className="hidden lg:block absolute bottom-[-50px] right-[-80px]">
                    <ImageWrapper
                        src="/assets/broken-heart.png"
                        alt={t("Broken Heart")}
                        width={72}
                        height={72}
                    />
                </div>
                <div className="lg:hidden block absolute top-[-70px] right-4 ">
                    <ImageWrapper
                        src="/assets/broken-heart.png"
                        alt={t("Broken Heart")}
                        width={72}
                        height={72}
                        className="rotate-10"
                    />
                </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold font-mon text-app-blue mt-6">
                {t("404 - Page Not Found")}
            </h1>

            <p className="text-[#6B7280] mt-2 max-w-lg">
                {t(
                    "The page you are looking for might have been removed, had its name changed or is temporarily unavailable."
                )}
            </p>

            <Button
                onClick={handleGoBack}
                variant={"secondary"}
                size={"lg"}
                className="flex items-center justify-center gap-2 mt-10"
            >
                <Home className="h-12 w-12" />
                {t("Back to Home")}
            </Button>
        </div>
    );
};

export default NotFoundPage;
