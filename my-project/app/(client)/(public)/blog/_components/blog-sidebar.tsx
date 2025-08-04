"use client";
import { Button } from "@/components/client/ux/button";
import ImageWrapper from "@/components/client/image-wrapper";

export function BlogSidebar() {
  const categories = [
    { name: "Dating", count: 12 },
    { name: "Love", count: 8 },
    { name: "Wellness", count: 15 },
    { name: "Tips", count: 6 },
  ];

  const featuredPosts = [
    {
      id: "1",
      title: "Getting And Keeping An Ex Back",
      image: "/assets/article-shot.png",
      date: "Dec 15, 2024",
    },
    {
      id: "2",
      title: "Self Threads And Clothing For Motivation",
      image: "/assets/article-shot.png",
      date: "Dec 12, 2024",
    },
    {
      id: "3",
      title: "Using The Art: Teen Experts Up Motherhood Life",
      image: "/assets/article-shot.png",
      date: "Dec 10, 2024",
    },
    {
      id: "4",
      title: "Understanding In Have A Journey Through My Love",
      image: "/assets/article-shot.png",
      date: "Dec 8, 2024",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-bold text-lg">Explore Categories</h4>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
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

      {/* Featured Posts */}
      <div className="space-y-2">
        <h3 className="font-bold">Featured Posts</h3>

        <div className="space-y-4">
          {featuredPosts.map((post) => (
            <div key={post.id} className="flex space-x-3">
              <ImageWrapper
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm line-clamp-2 hover:text-pink-500 transition-colors cursor-pointer">
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </h4>
                <p className="text-xs text-gray-500 mt-1">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
