"use client";

import { useState } from "react";
import { Container } from "@/components/client/ux/container";
import { BlogCard } from "./_components/blog-card";
import { Button } from "@/components/client/ux/button";
import { CustomPagination } from "@/components/client/ux/custom-pagination";
import { useBlogs } from "@/app/shared-hooks/useBlogs";
import Preloader from "@/components/shared/Preloader";

export default function BlogPage() {
  const {
    blogs: blogPosts = [],
    loading,
    error,
    categories,
    categoryNames,
    stats,
  } = useBlogs();

  const [page, setPage] = useState(1);

  const total =
    categories.length > 0
      ? categories[0].pagination?.totalPages ?? 1
      : 1;

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
    <div className="bg-white">
      <Container className="px-4 md:px-6">
        <div className="py-[50px] pt-[114px] xl:pt-[124px] xl:pb-[92px]">
          <div className="flex flex-col gap-3 lg:flex-row justify-between mb-8">
            <h3 className="text-[22px] lg:text-[26px] font-semibold text-base lg:text-lg">
              Blog
            </h3>
            <div className="flex-wrap gap-3 flex text-sm">
              {categoryNames &&
                categoryNames.map((name) => (
                  <Button
                    variant="outline"
                    key={name}
                    className="shadow-none"
                  >
                    {name}
                  </Button>
                ))}
            </div>
          </div>
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

          <div className="flex justify-center items-center space-x-2 mb-12">
            <CustomPagination
              totalPages={total}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
