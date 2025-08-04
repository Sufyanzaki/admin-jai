import { Container } from "@/components/client/ux/container";

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <Container className="px-4 md:px-6">
        <div className="py-[50px] pt-[114px] xl:pt-[124px] xl:pb-[92px]">
          {/* Page Header */}
          <div className="mb-8 lg:mb-12">
            <h3 className="text-[16px] lg:text-[22px] font-semibold text-base lg:text-lg">
              Terms
            </h3>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          {/* Terms Content */}
          <div className="space-y-8 prose prose-gray">
            <div>
              <h4 className="text-xl lg:text-[22px] font-semibold mb-1">
                Privacy and Legal
              </h4>
              <h6 className="text-[18px] lg:text-[20px] mb-5 font-medium">
                General
              </h6>
              <p className="text-[13px] lg:text-[16px] leading-relaxed">
                Please read these terms carefully before using this website. By
                accessing, browsing, or using this website, you acknowledge that
                you have read, understood, and agree to be bound bt these terms
                if use. If you do not accept these Terms of use, do not use the
                website.{" "}
              </p>
            </div>

            <div>
              <h4 className="text-[18px] lg:text-xl font-semibold mb-4">
                Part 1
              </h4>
              <p className="text-[13px] lg:text-[16px] leading-relaxed mb-4">
                Lorem Ipsum is simply dummy text of the printing and type&apos;ting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s,
              </p>
              <p className="text-[13px] lg:text-[16px] leading-relaxed mb-4">
                Lorem Ipsum is simply dummy text of the printing and type&apos;ting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s,
              </p>
            </div>
             <div>
              <h4 className="text-[18px] lg:text-xl font-semibold mb-4">
                Part 1.a
              </h4>
              <p className="text-[13px] lg:text-[16px] leading-relaxed mb-4">
                Lorem Ipsum is simply dummy text of the printing and type&apos;ting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s,
              </p>
              <p className="text-[13px] lg:text-[16px] leading-relaxed mb-4">
                Lorem Ipsum is simply dummy text of the printing and type&apos;ting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s,
              </p>
            </div>
             <div>
              <h4 className="text-[18px] lg:text-xl font-semibold mb-4">
                Part 1.b
              </h4>
              <p className="text-[13px] lg:text-[16px] leading-relaxed mb-4">
                Lorem Ipsum is simply dummy text of the printing and type&apos;ting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s,
              </p>
              <p className="text-[13px] lg:text-[16px] leading-relaxed mb-4">
                Lorem Ipsum is simply dummy text of the printing and type&apos;ting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s,
              </p>
            </div> 
            <div className="h-[1px] bg-app-border/60"> </div>
            <div>
              <h4 className="text-[18px] lg:text-xl font-semibold mb-4">
                Part 2
              </h4>
              <p className="text-[13px] lg:text-[16px] leading-relaxed mb-4">
                Lorem Ipsum is simply dummy text of the printing and type&apos;ting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s,
              </p>
              <p className="text-[13px] lg:text-[16px] leading-relaxed mb-4">
                Lorem Ipsum is simply dummy text of the printing and type&apos;ting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s,
              </p>
            </div>
              <div>
              <h4 className="text-[18px] lg:text-xl font-semibold mb-4">
                Part 2.a
              </h4>
              <p className="text-[13px] lg:text-[16px] leading-relaxed mb-4">
                Lorem Ipsum is simply dummy text of the printing and type&apos;ting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s,
              </p>
              <p className="text-[13px] lg:text-[16px] leading-relaxed mb-4">
                Lorem Ipsum is simply dummy text of the printing and type&apos;ting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s,
              </p>
            </div>
          </div>

          {/* Banner Space */}
          <div className="mt-16 mb-8">
            <div className="bg-gray-200 h-32 flex items-center justify-center rounded-lg">
              <span className="text-gray-500 text-lg">banner space</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
