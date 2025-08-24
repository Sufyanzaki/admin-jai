"use client";
import { Button } from "@/components/client/ux/button";
import ImageWrapper from "@/components/client/image-wrapper";
import { useBlogCategories } from "@/app/shared-hooks/useBlogCategories";
import Preloader from "@/components/shared/Preloader";
import { useBlogs } from "@/app/shared-hooks/useBlogs";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function BlogSidebar() {
    const { t } = useTranslation();
    const { categories, loading, error } = useBlogCategories();
    const { blogs, loading: blogPostLoading } = useBlogs();

    const params = useParams();
    const id = Number(params.id);

    if (loading || blogPostLoading) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader />
                <p className="text-sm">{t("Loading relative blogs...")}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center flex-col justify-center h-64 gap-3">
                <h2 className="text-2xl font-bold text-red-600">
                    {t("Error loading blogs")}
                </h2>
                <p className="text-muted-foreground">{error.message}</p>
            </div>
        );
    }

    const filteredBlogs = blogs.filter((blog) => Number(blog.id) !== id);

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <h4 className="font-bold text-lg">{t("Explore Categories")}</h4>

                <div className="flex flex-wrap gap-3">
                    {categories &&
                        categories.map((category) => (
                            <Button
                                variant="outline"
                                key={category.name}
                                className="shadow-none"
                            >
                                {category.name}
                            </Button>
                        ))}
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-bold">{t("Featured Posts")}</h3>
                <div className="space-y-4">
                    {filteredBlogs.map((post) => (
                        <div key={post.id} className="flex space-x-3">
                            <ImageWrapper
                                src={post.bannerImage || "/placeholder.svg"}
                                alt={post.title}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h4 className="font-medium text-sm line-clamp-2 hover:text-pink-500 transition-colors cursor-pointer">
                                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    {format(new Date(post.createdAt), "MMMM d, yyyy")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}