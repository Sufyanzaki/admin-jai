"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Box, DollarSign, MoreHorizontal, Plus, Search, Users} from "lucide-react"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

interface PackageDto {
    id: number,
    name: string,
    image: string,
    price: string,
    duration: string,
    features: string[],
    status: string,
}

export default function PackagesPage() {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [currentPackage, setCurrentPackage] = useState(packages[0])

    const openDeleteDialog = (pkg: PackageDto) => {
        setCurrentPackage(pkg)
        setDeleteDialogOpen(true)
    }

    return (
        <>
            <div className="flex flex-col gap-5 p-4 xl:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Packages</h2>
                        <p className="text-muted-foreground">Manage your subscription packages and pricing</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/packages/add">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Package
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm xl:text-lg font-medium">Total Packages</CardTitle>
                            <Box className="size-8 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-2xl xl:text-4xl font-bold mb-2">4</h2>
                            <p className="text-xs text-muted-foreground">+1 from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm xl:text-lg font-medium">Active Subscriptions</CardTitle>
                            <Users className="size-8 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-2xl xl:text-4xl font-bold mb-2">128</h2>
                            <p className="text-xs text-muted-foreground">+24 from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm xl:text-lg font-medium">Total Revenue</CardTitle>
                            <DollarSign className="size-8 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-2xl xl:text-4xl font-bold mb-2">Є3,240</h2>
                            <p className="text-xs text-muted-foreground">+12% from last month</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="col-span-3">
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle>Package List</CardTitle>
                                <CardDescription>View and manage all subscription packages</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 text-muted-foreground" />
                                    <Input type="search" placeholder="Search packages..." className="w-full pl-8 md:w-[300px]" />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="mb-4">
                                <TabsTrigger value="all">All Packages</TabsTrigger>
                                <TabsTrigger value="active">Active</TabsTrigger>
                                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all" className="w-full">
                                <Table className="whitespace-nowrap">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Package</TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Duration</TableHead>
                                            <TableHead>Features</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="whitespace-nowrap">
                                        {packages.map((pkg) => (
                                            <TableRow key={pkg.id}>
                                                <TableCell>Package {pkg.id}</TableCell>
                                                <TableCell>
                                                    <Avatar>
                                                        <AvatarImage src={pkg.image} alt="Package image" />
                                                        <AvatarFallback>IMG</AvatarFallback>
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell>{pkg.price}</TableCell>
                                                <TableCell>{pkg.duration}</TableCell>
                                                <TableCell>{pkg.features.join(", ")}</TableCell>
                                                <TableCell>
                          <span
                              className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
                                  pkg.status === "Active"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {pkg.status}
                          </span>
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
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>
                                                                <Link href={`/packages/${pkg.id}/view`} className="flex w-full">
                                                                    View details
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Link href={`/packages/${pkg.id}/edit`} className="flex w-full">
                                                                    Edit package
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => openDeleteDialog(pkg)}
                                                                className="text-red-600"
                                                            >
                                                                {pkg.status === "Active" ? "Deactivate" : "Activate"}
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                            <TabsContent value="active">
                                <Table className="whitespace-nowrap">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Package</TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Duration</TableHead>
                                            <TableHead>Features</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="whitespace-nowrap">
                                        {packages
                                            .filter((pkg) => pkg.status === "Active")
                                            .map((pkg) => (
                                                <TableRow key={pkg.id}>
                                                    <TableCell className="font-medium">Package {pkg.id}</TableCell>
                                                    <TableCell>
                                                        <Avatar>
                                                            <AvatarImage src={pkg.image} alt="Package image" />
                                                            <AvatarFallback>IMG</AvatarFallback>
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell>{pkg.price}</TableCell>
                                                    <TableCell>{pkg.duration}</TableCell>
                                                    <TableCell>{pkg.features.join(", ")}</TableCell>
                                                    <TableCell>
                            <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              {pkg.status}
                            </span>
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
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem>
                                                                    <Link href={`/packages/${pkg.id}`} className="flex w-full">
                                                                        View details
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Link href={`/packages/${pkg.id}/edit`} className="flex w-full">
                                                                        Edit package
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Link href={`/packages/${pkg.id}/subscribers`} className="flex w-full">
                                                                        View subscribers
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() => openDeleteDialog(pkg)}
                                                                    className="text-red-600"
                                                                >
                                                                    Deactivate
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                            <TabsContent value="inactive">
                                <Table className="whitespace-nowrap">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Package</TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Duration</TableHead>
                                            <TableHead>Features</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="whitespace-nowrap">
                                        {packages
                                            .filter((pkg) => pkg.status === "Inactive")
                                            .map((pkg) => (
                                                <TableRow key={pkg.id}>
                                                    <TableCell className="font-medium">Package {pkg.id}</TableCell>
                                                    <TableCell>
                                                        <Avatar>
                                                            <AvatarImage src={pkg.image} alt="Package image" />
                                                            <AvatarFallback>IMG</AvatarFallback>
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell>{pkg.price}</TableCell>
                                                    <TableCell>{pkg.duration}</TableCell>
                                                    <TableCell>{pkg.features.join(", ")}</TableCell>
                                                    <TableCell>
                            <span className="inline-flex items-center rounded-md bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              {pkg.status}
                            </span>
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
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem>
                                                                    <Link href={`/packages/${pkg.id}`} className="flex w-full">
                                                                        View details
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Link href={`/packages/${pkg.id}/edit`} className="flex w-full">
                                                                        Edit package
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Link href={`/packages/${pkg.id}/subscribers`} className="flex w-full">
                                                                        View subscribers
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() => openDeleteDialog(pkg)}
                                                                    className="text-green-600"
                                                                >
                                                                    Activate
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {currentPackage?.status === "Active"
                                ? "Are you sure you want to deactivate this package?"
                                : "Are you sure you want to activate this package?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {currentPackage?.status === "Active"
                                ? "Deactivating will prevent new subscriptions but existing subscribers will keep their access until expiration."
                                : "Activating will make this package available for new subscriptions immediately."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => setDeleteDialogOpen(false)}
                            className={currentPackage?.status === "Active" ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"}
                        >
                            {currentPackage?.status === "Active" ? "Deactivate" : "Activate"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

const packages = [
    {
        id: 1,
        name: "Free Tier",
        image: "-",
        price: "Є0",
        duration: "1 month",
        features: ["Basic features", "Limited access", "Ad-supported"],
        status: "Active",
    },
    {
        id: 2,
        name: "Starter",
        image: "/user-2.png",
        price: "Є5",
        duration: "1 month",
        features: ["All basic features", "Ad-free", "Priority support"],
        status: "Active",
    },
    {
        id: 3,
        name: "Professional",
        image: "-",
        price: "Є37",
        duration: "3 months",
        features: ["Advanced features", "API access", "24/7 support"],
        status: "Active",
    },
    {
        id: 4,
        name: "Enterprise",
        image: "-",
        price: "Є57",
        duration: "6 months",
        features: ["All features", "Dedicated account manager", "Custom solutions"],
        status: "Active",
    },
    {
        id: 5,
        name: "Legacy",
        image: "Old Img",
        price: "Є25",
        duration: "1 month",
        features: ["Deprecated features", "Limited support"],
        status: "Inactive",
    }
]