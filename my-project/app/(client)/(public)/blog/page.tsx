"use client";

import { useState } from "react";
import { Container } from "@/components/client/ux/container";
import { BlogCard } from "./_components/blog-card";
import { Button } from "@/components/client/ux/button";
import { useBlogs } from "@/app/shared-hooks/useBlogs";
import Preloader from "@/components/shared/Preloader";
import PaginationSection from "@/app/(client)/dashboard/_components/pagination";
import { useTranslation } from "react-i18next";

export default function BlogPage() {
  const {t} = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    blogs: blogPosts = [],
    loading,
    error,
    categoryNames,
    pagination
  } = useBlogs(selectedCategory, currentPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCurrentPage(1);
  };

  if (loading) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">{t("loading")}</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex items-center flex-col justify-center h-64 gap-3">
          <h2 className="text-2xl font-bold text-red-600">
            {t("errorTitle")}
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
                {t("title")}
              </h3>
              <div className="flex-wrap gap-3 flex text-sm">
                {categoryNames && categoryNames.map((name) => (
                    <Button
                        variant={selectedCategory === name ? "theme" : "outline"}
                        key={name}
                        className="shadow-none"
                        onClick={() => handleCategoryChange(name)}
                    >
                      {name}
                    </Button>
                ))}
              </div>
            </div>

            {selectedCategory && (
                <div className="mb-6">
                  <p className="text-lg font-medium">
                    {t("showingPostsIn")}{" "}
                    <span className="text-primary">{selectedCategory}</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2"
                        onClick={() => setSelectedCategory(null)}
                    >
                      {t("clearFilter")}
                    </Button>
                  </p>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {blogPosts.length === 0 ? (
                  <div className="col-span-full flex items-center justify-center h-32">
                    <p className="text-muted-foreground">
                      {selectedCategory
                          ? t("noPostsInCategory", { category: selectedCategory })
                          : t("noPostsAvailable")
                      }
                    </p>
                  </div>
              ) : (
                  blogPosts.map((post) => <BlogCard key={post.id} {...post} />)
              )}
            </div>

            <div className="flex justify-center items-center space-x-2 mb-12">
              <PaginationSection
                  pagination={pagination}
                  onPageChange={handlePageChange}
              />
            </div>
          </div>
        </Container>
      </div>
  );
}
