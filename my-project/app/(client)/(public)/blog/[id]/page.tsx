'use client'
import CustomBreadcrumbs from "@/components/client/ux/custom-breadcrumbs";
import ImageWrapper from "@/components/client/image-wrapper";
import { Container } from "@/components/client/ux/container";
import { BlogSidebar } from "@/app/(client)/(public)/blog/_components/blog-sidebar";
import useBlogById from "@/app/shared-hooks/useBlogById";
import { useParams } from "next/navigation";
import { unescapeHtml } from "@/lib/utils";
import Preloader from "@/components/shared/Preloader";
export default function BlogDetailPage() {
  const params = useParams();
  const { blog, loading, error } = useBlogById(String(params?.id));

  
      if (loading) {
            return (
                <div className="flex items-center flex-col justify-center h-64">
                    <Preloader />
                    <p className="text-sm">Loading your profile information...</p>
                </div>
            );
        }
    
        if (error) {
            return (
                <div className="flex items-center flex-col justify-center h-64 gap-3">
                    <h2 className="text-2xl font-bold text-red-600">
                        Error loading your profile information
                    </h2>
                    <p className="text-muted-foreground">{error.message}</p>
                </div>
            );
        }
  

  return (
    <>
      <div className="bg-white minh-screen">
        <Container className="px-4 md:px-6">
          <div className="py-[50px] pt-[114px] xl:pt-[124px] xl:pb-[92px]">
            {/* Article Header */}
            <div className="mb-5 lg:mb-12 text-center ">
              <h3 className="lg:px-52 text-base lg:text-[22px] font-semibold text-gray-900 mb-3 lg:mb-8">
                {blog?.category?.name}: {blog?.title}
              </h3>

              <p className="lg:px-22 text-[10px] lg:text-[18px] leading-relaxed">
                {blog?.shortDescription}
              </p>
            </div>

            <p className="  leading-relaxed mb-6">
              <CustomBreadcrumbs
                items={[
                  { label: "Blogs", href: "/blog" },
                  { label: blog?.title || "Magazine" },
                ]}
              />
            </p>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <ImageWrapper
                    src={blog?.bannerImage || "/assets/article-shot.png"}
                    alt="Woman relaxing on couch"
                    className="w-full h-[150px] lg:h-[405px] object-cover rounded-[5px]"
                  />
                </div>

                {/* Article Content */}
                <div className="text-sm prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: unescapeHtml(blog?.description ? blog?.description : "blog content") }}
                >

                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar />
              </div>
            </div>

            {/* Banner Space */}
            <div className="mt-16 bg-gray-200 h-32 flex items-center justify-center rounded-lg">
              <span className="text-gray-500 text-lg">banner space</span>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
