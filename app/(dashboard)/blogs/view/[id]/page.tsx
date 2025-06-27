"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Calendar, Eye, MessageSquare, Bookmark, Share2 } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Static blog data
const blog = {
  id: 1,
  title: "The Future of Healthcare Technology",
  slug: "future-of-healthcare-tech",
  category: "Technology",
  status: "Published",
  author: "Dr. Sarah Johnson",
  publishedDate: "2023-11-15",
  views: 1245,
  comments: 28,
  bannerImage: "/healthcare-tech-banner.jpg",
  shortDescription: "Exploring how emerging technologies are transforming patient care and medical practices.",
  content: `
    <p>The healthcare industry is undergoing a digital revolution, with new technologies emerging at an unprecedented pace. From AI-powered diagnostics to telemedicine platforms, these innovations are reshaping how we deliver and receive care.</p>
    
    <h3>Artificial Intelligence in Diagnostics</h3>
    <p>AI algorithms can now analyze medical images with accuracy rivaling human experts, reducing diagnostic times from days to minutes. This technology is particularly impactful in radiology and pathology.</p>
    
    <h3>Telemedicine Expansion</h3>
    <p>The pandemic accelerated adoption of virtual care, and patients have come to expect this convenience. Modern platforms now integrate with EHR systems and wearable devices for comprehensive remote monitoring.</p>
    
    <h3>Blockchain for Health Records</h3>
    <p>Secure, decentralized record-keeping promises to give patients control over their data while improving interoperability between providers.</p>
  `,
  metaTitle: "Healthcare Tech Trends | Future of Medicine",
  metaDescription: "Discover how AI, telemedicine and blockchain are transforming healthcare delivery and patient outcomes.",
  metaKeywords: "healthcare technology, AI medicine, telemedicine, blockchain healthcare"
}
export default function BlogListPage() {
  return (
      <div className="flex flex-col gap-5 p-4 xl:p-6">
        <div className="flex items-center gap-2">
          <Link href="/blogs/list">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">{blog.title}</h2>
          <Badge
              className={
                blog.status === "Published"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
              }
          >
            {blog.status}
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Views</CardTitle>
              <Eye className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blog.views}</div>
              <p className="text-xs text-muted-foreground">+245 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageSquare className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blog.comments}</div>
              <p className="text-xs text-muted-foreground">+8 new comments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Calendar className="size-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date(blog.publishedDate).toLocaleDateString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.floor((new Date().getTime() - new Date(blog.publishedDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
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
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/doctor-avatar.jpg" alt={blog.author} />
                  <AvatarFallback>
                    {blog.author
                        .split(" ")
                        .map(n => n[0])
                        .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">Author: {blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Category: {blog.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                Published: {new Date(blog.publishedDate).toLocaleDateString()}
              </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Views: {blog.views}</span>
              </div>
              <div className="pt-4">
                <h4 className="mb-2 text-sm font-medium">Engagement Rate</h4>
                <Progress value={65} className="h-2" />
                <p className="mt-1 text-xs text-muted-foreground">
                  65% of readers interacted with content
                </p>
              </div>
              <div className="flex gap-2 pt-4 flex-wrap">
                <Link href={`/blogs/${blog.id}/edit`}>
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
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
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
                      {blog.metaKeywords.split(", ").map((keyword, i) => (
                          <Badge key={i} variant="outline">
                            {keyword}
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
