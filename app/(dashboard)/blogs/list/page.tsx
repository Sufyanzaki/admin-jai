import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Ambulance,
  Ban,
  Car,
  CheckCircle,
  Edit,
  Eye,
  MoreHorizontal,
  Notebook, Pencil,
  Plus,
  Search,
  Settings, Trash,
  Wrench
} from "lucide-react";
import Link from "next/link";

const blogData = [
  {
    id: 1,
    title: "Flirten & versieren Magazine",
    category: "Home",
    date: "30-10-2024",
    status: "Active",
  },
  {
    id: 2,
    title: "Flirten",
    category: "Home",
    date: "30-10-2024",
    status: "Active",
  },
  {
    id: 3,
    title: "Versieren",
    category: "Home",
    date: "30-10-2024",
    status: "Active",
  },
  {
    id: 4,
    title: "Magazine",
    category: "Home",
    date: "30-10-2024",
    status: "Active",
  },
  {
    id: 5,
    title: "Transcendental Learning: Adapting to Educational Innovations",
    category: "Technology",
    date: "01-11-2024",
    status: "Active",
  },
  {
    id: 6,
    title: "Unraveling The Mysteries Of Dark Matter",
    category: "Technology",
    date: "01-11-2024",
    status: "Active",
  },
  {
    id: 7,
    title: "A Journey Through The Enchanting Landspace Of New Zealand",
    category: "Technology",
    date: "01-11-2024",
    status: "Active",
  },
  {
    id: 8,
    title: "The Important Of Mental Health In Modern Society",
    category: "Technology",
    date: "01-11-2024",
    status: "Active",
  },
  {
    id: 9,
    title: "Culinary Delights: Exploring Exotic Flavors Around The World",
    category: "Technology",
    date: "01-11-2024",
    status: "Active",
  },
  {
    id: 10,
    title: "The Rise Of E-Sports: A New Era In Competitive Gaming",
    category: "Technology",
    date: "01-11-2024",
    status: "Active",
  },
];

export default function BlogListPage() {
  return (
    <div className="flex flex-col gap-4 p-4 xl:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Blog List</h1>
          <p className="text-muted-foreground">Manage and track all ambulances in the fleet</p>
        </div>
        <Button className="w-full md:w-auto" asChild>
          <Link className="flex items-center" href="/blogs/create">
            <Plus className="mr-2 h-4 w-4" />
            New Blog
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">7</div>
              <Notebook className="size-8 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4</div>
              <CheckCircle className="size-8 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">Currently visible and updated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3</div>
              <Ban className="size-8 text-red-500" />
            </div>
            <p className="text-xs text-muted-foreground">Hidden or unpublished blogs</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blogs Table</CardTitle>
          <CardDescription>View and manage all ambulances in your fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table className="whitespace-nowrap">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="whitespace-nowrap">
                {blogData.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium">
                        <Link href="/(dashboard)/blogs/details" className="hover:underline">
                          {blog.id}
                        </Link>
                      </TableCell>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell className="hidden md:table-cell">{blog.category}</TableCell>
                      <TableCell>{blog.date}</TableCell>
                      <TableCell>
                        <Badge
                            variant={
                              blog.status === "Active"
                                  ? "default"
                                  : blog.status === "Inactive"
                                      ? "outline"
                                      : "secondary"
                            }
                        >
                          {blog.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/blogs/view/1`} className="flex items-center w-full">
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/blogs/edit/1`} className="flex items-center w-full">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
