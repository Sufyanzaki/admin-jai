import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Pencil, Plus, Trash} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const items = [
    { id: 1, image: "-", price: "Є0", status: "Active" },
    { id: 2, image: "Meta Img", price: "Є5", status: "Active" },
    { id: 3, image: "-", price: "Є37", status: "Active" },
    { id: 4, image: "-", price: "Є57", status: "Active" }
];

export default function PackagesPage() {
  return (
      <>
          <div className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Packages View</h2>
                      <p className="text-muted-foreground">Manage your users and their information.</p>
                  </div>

                  <Button asChild>
                      <Link href="/packages/add">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Package
                      </Link>
                  </Button>
              </div>

              <Card>
                  <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                          <CardTitle>Packages List</CardTitle>
                          <CardDescription>A list of all packages in your app with their details.</CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent>
                      <Table className="whitespace-nowrap">
                          <TableHeader>
                              <TableRow>
                                  <TableHead>ID</TableHead>
                                  <TableHead>Image</TableHead>
                                  <TableHead>Price</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody className="whitespace-nowrap">
                              {items.length === 0 ? (
                                  <TableRow>
                                      <TableCell colSpan={8} className="h-24 text-center">
                                          No members found matching your filters.
                                      </TableCell>
                                  </TableRow>
                              ) : (
                                  items.map((item) => (
                                      <TableRow key={item.id}>
                                          <TableCell>{item.id}</TableCell>
                                          <TableCell>{item.image}</TableCell>
                                          <TableCell>{item.price}</TableCell>
                                          <TableCell>
                                              <span
                                                  className={`inline-flex px-2 py-1 text-sm font-medium rounded-full ${
                                                      item.status === "Active"
                                                          ? "bg-green-100 text-green-800"
                                                          : "bg-gray-100 text-gray-800"
                                                  }`}
                                              >
                                                {item.status}
                                              </span>
                                          </TableCell>
                                          <TableCell className="text-right flex justify-end gap-2">
                                              <Button variant="outline" size="icon">
                                                  <Link href="/packages/1">
                                                      <Pencil className="w-4 h-4" />
                                                  </Link>
                                              </Button>
                                              <Button variant="outline" size="icon">
                                                  <Trash className="w-4 h-4 text-red-500" />
                                              </Button>
                                          </TableCell>
                                      </TableRow>
                                  ))
                              )}
                          </TableBody>
                      </Table>
                  </CardContent>
              </Card>
          </div>
      </>
  )
}