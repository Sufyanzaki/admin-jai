"use client";
import ImageWrapper from "@/components/client/image-wrapper";
import {BlogDto} from "@/app/shared-types/blog";
import {formatDate} from "date-fns";
import {unescapeHtml} from "@/lib/utils";
import Link from "next/link";

export function BlogCard({
  id,
  title,
  bannerImage,
  createdAt,
  description
}: BlogDto) {
  return (
    <div className="p-0 overflow-hidden">
      <div className="relative hidden lg:block">
        <img src={bannerImage || "/placeholder.svg"} alt={title} className="rounded-[5px] object-cover aspect-video" />
      </div>

      <div className="relative lg:hidden block">
        <img src={bannerImage || "/placeholder.svg"} alt={title} className="rounded-[5px] object-cover aspect-square" />
      </div>
      <div className="py-3 px-0">
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center space-x-1 text-sm">
            {/*<span className="text-sm">{category?.name}</span>*/}
          </div>
          <div className="flex flex-row items-center space-x-1 ">
            <div className="bg-gray-100 rounded-full p-1">
              <ImageWrapper
                src={bannerImage || "/asstes/user/png"}
                alt="bannerImage"
                className="w-8 h-8 rounded-full"
              />
            </div>

            <span className="text-sm font-medium">
              {formatDate(createdAt, "dd-MM-yyyy")}

            </span>
          </div>
        </div>
        <h4 className="font-semibold text-[18px] lg:text-xl mb-2 transition-colors cursor-pointer">
          <Link href={`/blog/${id}`}>{title}</Link>
        </h4>
        <p
            className="text-gray-600 text-sm line-clamp-3"
            dangerouslySetInnerHTML={{ __html: unescapeHtml(description) }}
        />
      </div>
    </div>
  );
}
