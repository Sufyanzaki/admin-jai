"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Calendar, Eye, MessageSquare, Bookmark, Share2 } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useParams } from "next/navigation";
import useBlogById from "../../_hooks/useBlogById";
import { unescapeHtml } from "@/lib/utils"
import Preloader from "@/components/ui/Preloader";

export default function BlogListDetails() {
  const params = useParams();
  const id = params.id as string | number;
  const { blog, loading, error } = useBlogById(id);

  if (loading) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading Blogs...</p>
        </div>
    )
  }
  if (error || !blog) {
    return <div className="flex items-center justify-center h-64 text-red-500">Blog not found</div>;
  }

  return (
      <div className="flex flex-col gap-5 p-4 xl:p-6">
        <div className="flex items-center gap-2">
          <Link href="/blogs/list">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">{blog.title}</h2>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Category ID</CardTitle>
              <Bookmark className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blog.categoryId}</div>
              <p className="text-xs text-muted-foreground">Category ID for this blog</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Created</CardTitle>
              <Calendar className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}
              </div>
              <p className="text-xs text-muted-foreground">
                {blog.createdAt ? `${Math.floor((new Date().getTime() - new Date(blog.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days ago` : ''}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="md:grid gap-4 max-md:space-y-4 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Blog Information</CardTitle>
              <CardDescription>Details about this blog post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Category ID: {blog.categoryId}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                Created: {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}
              </span>
              </div>
              <div className="pt-4">
                <h4 className="mb-2 text-sm font-medium">Meta Title</h4>
                <p className="text-xs text-muted-foreground">{blog.metaTitle}</p>
              </div>
              <div className="flex gap-2 pt-4 flex-wrap">
                <Link href={`/blogs/list/edit/${blog.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Blog
                  </Button>
                </Link>
                <Button size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Blog Content</CardTitle>
              <CardDescription>Full content and details</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content">
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4">
                  <div className="rounded-md overflow-hidden mb-4">
                    <img
                        src={blog.bannerImage}
                        alt={blog.title}
                        className="w-full h-auto object-cover"
                    />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">
                    {blog.shortDescription}
                  </p>
                  <div
                      className="prose max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: unescapeHtml(blog.description) }}
                  />
                </TabsContent>
                <TabsContent value="seo" className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Meta Title</h4>
                    <p className="text-sm">{blog.metaTitle}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Meta Description</h4>
                    <p className="text-sm">{blog.metaDescription}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {blog.metaKeywords.split(",").map((keyword: string, i: number) => (
                          <Badge key={i} variant="outline">
                            {keyword.trim()}
                          </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
