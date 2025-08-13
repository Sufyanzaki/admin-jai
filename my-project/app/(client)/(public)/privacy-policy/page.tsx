"use client";
import { useTOS } from "@/app/shared-hooks/useTOS";
import ImageWrapper from "@/components/client/image-wrapper";
import { Container } from "@/components/client/ux/container";
import Preloader from "@/components/shared/Preloader";
import { formatDate } from "date-fns";

export default function TermsPage() {
  const { tosSettings, tosLoading } = useTOS();
  if (tosLoading)
    return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader />
        <p className="text-sm">Loading ...</p>
      </div>
    );
  return (
    <div className="bg-white min-h-screen">
      <Container className="px-4 md:px-6">
        <div className="py-[50px] pt-[114px] xl:pt-[124px] xl:pb-[92px]">
          {/* Page Header */}
          <div className="mb-8 lg:mb-12">
            <h3 className="text-[16px] lg:text-[22px] font-semibold text-base lg:text-lg">
              {tosSettings?.Title}
            </h3>
            <p className="text-gray-600">
              Last updated: {formatDate(tosSettings?.updatedAt, "MMMM d, yyyy")}
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-8 prose prose-gray">
            <div>
              <h4 className="text-xl lg:text-[22px] font-semibold mb-1">
                {tosSettings?.pageType}
              </h4>
              <h6 className="text-[18px] lg:text-[20px] mb-5 font-medium">
                 {tosSettings?.pageSectiontitle}
              </h6>
              <p className="text-[13px] lg:text-[16px] leading-relaxed">
               {tosSettings?.content}
                <a
                  href={tosSettings?.link}
                  target="_blank"
                  className="text-blue-500"
                >
                  Visit
                </a>
              </p>
            </div>

          </div>

          {/* Banner Space */}
          <div className="mt-16 mb-8">
            <div className="bg-gray-200 h-32 flex items-center justify-center rounded-lg">
              <ImageWrapper
                src={tosSettings?.metaImage}
                alt={tosSettings?.metaTitle}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
