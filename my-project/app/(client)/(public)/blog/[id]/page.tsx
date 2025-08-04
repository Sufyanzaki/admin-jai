import CustomBreadcrumbs from "@/components/client/ux/custom-breadcrumbs";
import ImageWrapper from "@/components/client/image-wrapper";
import { Container } from "@/components/client/ux/container";
import {BlogSidebar} from "@/app/(client)/(public)/blog/_components/blog-sidebar";
export default function BlogDetailPage() {
  return (
    <>
      <div className="bg-white minh-screen">
        <Container className="px-4 md:px-6">
          <div className="py-[50px] pt-[114px] xl:pt-[124px] xl:pb-[92px]">
            {/* Article Header */}
            <div className="mb-5 lg:mb-12 text-center ">
              <h3 className="lg:px-52 text-base lg:text-[22px] font-semibold text-gray-900 mb-3 lg:mb-8">
                Home: Unveiling the Symphony of Life&apos;s Artistic Voyage
              </h3>

              <p className="lg:px-22 text-[10px] lg:text-[18px] leading-relaxed">
                In the grand tapestry of existence, the journey of life unfolds
                through the lens of creativity, where each individual becomes an
                artist, contributing unique brushstrokes to the canvas of
                existence.
              </p>
            </div>

            <p className="  leading-relaxed mb-6">
              <CustomBreadcrumbs
                items={[
                  { label: "Blogs", href: "/blog" },
                  { label: "Flirting & Seduction Magazine" },
                ]}
              />
            </p>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <ImageWrapper
                    src="/assets/article-shot.png"
                    alt="Woman relaxing on couch"
                    className="w-full h-[150px] lg:h-[405px] object-cover rounded-[5px]"
                  />
                </div>

                {/* Article Content */}
                <div className="text-sm prose prose-lg max-w-none">
                  <p className="text-sm leading-relaxed mb-3">
                    In the grand tapestry of existence, the journey of life
                    unfolds through the lens of creativity, where each
                    individual becomes an artist, contributing unique
                    brushstrokes to the canvas of existence.
                  </p>

                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    The Palette of Beginnings
                  </h4>

                  <p className=" leading-relaxed mb-2">
                    Within the context of our existence, creativity is the
                    heartbeat that transforms the mundane into the
                    extraordinary, breathing life into moments that might
                    otherwise be forgotten. It is the lens through which we
                    perceive beauty in the simplest of things, finding art in
                    the rhythm of daily life and discovering magic in the
                    ordinary.
                  </p>

                  <p className=" leading-relaxed mb-4">
                    This transformation is a testament process, evolving with
                    every phase, with each brushstroke adding depth and meaning
                    to the canvas. The artistic voyage is not merely about
                    creating something beautiful; it&apos;s about discovering the
                    beauty that already exists within us and allowing it to
                    manifest in ways that inspire and uplift not only ourselves
                    but also those around us.
                  </p>

                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Embracing Vulnerability and Resilience
                  </h4>

                  <p className=" leading-relaxed mb-2">
                    The essence of the creative journey often lies in the
                    willingness to be vulnerable, and in this vulnerability lies
                    strength. It is through embracing our imperfections and
                    uncertainties that we discover our true artistic potential.
                    The journey is not always smooth; there are moments of
                    doubt, periods of creative block, and times when the vision
                    seems unclear. However, it is precisely in these moments
                    that resilience becomes our greatest ally, guiding us
                    through the shadows and back into the light of creative
                    expression and self-discovery.
                  </p>
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
