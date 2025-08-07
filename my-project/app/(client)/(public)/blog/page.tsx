"use client";

import { useState } from "react";
import { Container } from "@/components/client/ux/container";
import { BlogCard } from "./_components/blog-card";
import { Button } from "@/components/client/ux/button";
import { CustomPagination } from "@/components/client/ux/custom-pagination";
import {useBlogs} from "@/app/shared-hooks/useBlogs";

export default function BlogPage() {
  const { blogs: blogPosts = [], loading, error } = useBlogs();
  const [page, setPage] = useState(1);
  const total = 4;

  return (
    <div className="bg-white">
      <Container className="px-4 md:px-6">
        {/* Page Header */}
        <div className="py-[50px] pt-[114px] xl:pt-[124px] xl:pb-[92px]">
          <div className="flex flex-col gap-3 lg:flex-row justify-between mb-8">
            <h3 className="text-[22px] lg:text-[26px] font-semibold text-base lg:text-lg">
              Blog
            </h3>
            <div className="flex-wrap gap-3 flex text-sm">
              <Button
                variant={"outline"}
                className="shadow-none border-[#374756]"
              >
                Dating
              </Button>
              <Button
                variant={"outline"}
                className="shadow-none border-[#374756]"
              >
                Love
              </Button>{" "}
              <Button
                variant={"outline"}
                className="shadow-none border-[#374756]"
              >
                Metrimony
              </Button>{" "}
              <Button
                variant={"outline"}
                className="shadow-none border-[#374756]"
              >
                Tips
              </Button>
            </div>
          </div>
          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                Loading blogs...
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-32 text-red-500">
                Error loading blogs
              </div>
            ) : (
              blogPosts.map((post) => <BlogCard key={post.id} {...post} />)
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mb-12">
            <CustomPagination
              totalPages={total}
              currentPage={page}
              onPageChange={setPage}
            />{" "}
          </div>

          {/* Banner Space */}
          <div className="bg-gray-200 h-32 flex items-center justify-center rounded-lg">
            <span className="text-gray-500 text-lg">banner space</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
