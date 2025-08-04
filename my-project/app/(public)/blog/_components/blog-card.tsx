"use client";
import ImageCard from "@/components/client/ux/image-card";
import ImageWrapper from "@/components/client/image-wrapper";
import { Blog } from "../_api/getAllBlogs";

export function BlogCard({
  id,
  title,
  bannerImage,
  metaImage,
  metaTitle,
  createdAt,
  categoryId,
}: Blog) {
  return (
    <div className="p-0 overflow-hidden">
      <div className="relative hidden lg:block">
        <ImageCard
          src={bannerImage || "/placeholder.svg"}
          alt={title}
          width={490}
          height={343}
          className="!rounded-[5px]"
        />
      </div>

      <div className="relative lg:hidden block">
        <ImageCard
          src={bannerImage || "/placeholder.svg"}
          alt={title}
          width={390}
          height={253}
          className="!rounded-[5px]"
        />
      </div>
      <div className="py-3 px-0">
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center space-x-1 text-sm">
            <span className="text-sm">{categoryId}</span>
          </div>
          <div className="flex flex-row items-center space-x-1 ">
            <div className="bg-gray-100 rounded-full p-1">
              <ImageWrapper
                src={metaImage || "/asstes/user/png"}
                alt="metaImage"
                className="w-8 h-8 rounded-full"
              />
            </div>

            <span className="text-sm font-medium">
              {metaTitle}-{createdAt}
            </span>
          </div>
        </div>
        <h4 className="font-semibold text-[18px] lg:text-xl mb-2 transition-colors cursor-pointer">
          <a href={`/blog/${id}`}>{title}</a>
        </h4>
        {/* <p className="text-gray-600 text-sm line-clamp-3">{excerpt}</p>
         */}
      </div>
    </div>
  );
}
