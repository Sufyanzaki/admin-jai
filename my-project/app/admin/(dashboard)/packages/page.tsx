"use client"

import {useState} from "react"
import {Button} from "@/components/admin/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/admin/ui/alert-dialog"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu"
import {Input} from "@/components/admin/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/admin/ui/table"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/admin/ui/tabs"
import {Box, DollarSign, MoreHorizontal, Plus, Search, Users} from "lucide-react"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/admin/ui/avatar"
import { usePatchPackage } from "./_hooks/usePatchPackage";
import Preloader from "@/components/shared/Preloader";
import {usePackages} from "@/app/shared-hooks/usePackages";
import {PackageDto} from "@/app/shared-types/packages";
import {useSession} from "next-auth/react";

import { useTranslation } from "react-i18next";

export default function PackagesPage() {
    const { t } = useTranslation();
    const { packages, loading, error, activePackages, totalSold, totalEarnings } = usePackages();
    const { data:session } = useSession();
    const { mutate: patchPackageStatus, loading: patching } = usePatchPackage();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [currentPackage, setCurrentPackage] = useState<null | PackageDto>(null)
    const [search, setSearch] = useState("");

    const openDeleteDialog = (pkg: PackageDto) => {
        setCurrentPackage(pkg)
        setDeleteDialogOpen(true)
    }

    const handlePatchStatus = async () => {
        if (currentPackage) {
            await patchPackageStatus(currentPackage.id, !currentPackage.isActive);
            setDeleteDialogOpen(false);
        }
    };

    const filteredPackages = (packages ?? []).filter(pkg =>
        pkg.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div className="flex items-center flex-col justify-center h-64">
            <Preloader/>
            <p className="text-sm">Loading packages</p>
        </div>
    );
    if (error) return <div className="p-6 text-red-500">Failed to load packages.</div>;
    if (!packages) return <div className="p-6 text-muted-foreground">No packages found.</div>;

    let permissions;
    if (session?.user.permissions) {
        permissions = session.user.permissions.find(permission => permission.module === "packages");
    }

    const canCreate = permissions?.canCreate ?? false;
    const canEdit = permissions?.canEdit ?? false;
    const canDelete = permissions?.canDelete ?? false;

    return (
        <>
            <div className="flex flex-col gap-5 p-4 xl:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">{t('Packages')}</h2>
                        <p className="text-muted-foreground">{t('Manage your subscription packages and pricing')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {canCreate && (
                            <Link href="/admin/packages/add">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    {t('Add Package')}
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm xl:text-lg font-medium">{t('Total Packages')}</CardTitle>
                            <Box className="size-8 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-2xl xl:text-4xl font-bold mb-2">{packages.length}</h2>
                            <p className="text-xs text-muted-foreground">{t('+1 from last month')}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm xl:text-lg font-medium">{t('Active Subscriptions')}</CardTitle>
                            <Users className="size-8 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-2xl xl:text-4xl font-bold mb-2">{activePackages}</h2>
                            <p className="text-xs text-muted-foreground">{t('+24 from last month')}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm xl:text-lg font-medium">{t('Total Revenue')}</CardTitle>
                            <DollarSign className="size-8 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-2xl xl:text-4xl font-bold mb-2">{totalEarnings}</h2>
                            <p className="text-xs text-muted-foreground">{t('+12% from last month')}</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="col-span-3">
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle>{t('Package List')}</CardTitle>
                                <CardDescription>{t('View and manage all subscription packages')}</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 text-muted-foreground" />
                                    <Input type="search" placeholder={t('Search packages...')} className="w-full pl-8 md:w-[300px]" value={search} onChange={e => setSearch(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="mb-4">
                                <TabsTrigger value="all">{t('All Packages')}</TabsTrigger>
                                <TabsTrigger value="active">{t('Active')}</TabsTrigger>
                                <TabsTrigger value="inactive">{t('Inactive')}</TabsTrigger>
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
                                            {(canEdit || canDelete) && <TableHead className="text-right">Actions</TableHead>}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="whitespace-nowrap">
                                        {filteredPackages.map((pkg) => (
                                            <TableRow key={pkg.id}>
                                                <TableCell>{pkg.name}</TableCell>
                                                <TableCell>
                                                    <Avatar>
                                                        <AvatarImage src={pkg.image} alt="Package image" />
                                                        <AvatarFallback>IMG</AvatarFallback>
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell>€{pkg.price}</TableCell>
                                                <TableCell>{pkg.validity} days</TableCell>
                                                <TableCell>Pending</TableCell>
                                                <TableCell>
                          <span
                              className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
                                  pkg.isActive
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {pkg.isActive ? "Active" : "Inactive"}
                          </span>
                                                </TableCell>
                                                {(canEdit || canDelete) && (
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
                                                                {canEdit && (
                                                                    <DropdownMenuItem>
                                                                        <Link href={`/admin/packages/${pkg.id}/edit`} className="flex w-full">
                                                                            Edit package
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {canDelete && (
                                                                    <>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem
                                                                            onClick={() => openDeleteDialog(pkg)}
                                                                            className={pkg.isActive ? "text-red-600" : "text-green-600"}
                                                                        >
                                                                            {pkg.isActive ? "Deactivate" : "Activate"}
                                                                        </DropdownMenuItem>
                                                                    </>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                )}
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
                                            {(canEdit || canDelete) && <TableHead className="text-right">Actions</TableHead>}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="whitespace-nowrap">
                                        {filteredPackages
                                            .filter((pkg) => pkg.isActive)
                                            .map((pkg) => (
                                                <TableRow key={pkg.id}>
                                                    <TableCell className="font-medium">{pkg.name}</TableCell>
                                                    <TableCell>
                                                        <Avatar>
                                                            <AvatarImage src={pkg.image} alt="Package image" />
                                                            <AvatarFallback>IMG</AvatarFallback>
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell>€{pkg.price}</TableCell>
                                                    <TableCell>{pkg.validity} days</TableCell>
                                                    <TableCell>Pending</TableCell>
                                                    <TableCell>
                            <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Active
                            </span>
                                                    </TableCell>
                                                    {(canEdit || canDelete) && (
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
                                                                    {canEdit && (
                                                                        <DropdownMenuItem>
                                                                            <Link href={`/admin/packages/${pkg.id}/edit`} className="flex w-full">
                                                                                Edit package
                                                                            </Link>
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                    {canDelete && (
                                                                        <>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem
                                                                                onClick={() => openDeleteDialog(pkg)}
                                                                                className="text-red-600"
                                                                            >
                                                                                Deactivate
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    )}
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
                                            {(canEdit || canDelete) && <TableHead className="text-right">Actions</TableHead>}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="whitespace-nowrap">
                                        {filteredPackages
                                            .filter((pkg) => !pkg.isActive)
                                            .map((pkg) => (
                                                <TableRow key={pkg.id}>
                                                    <TableCell className="font-medium">{pkg.name}</TableCell>
                                                    <TableCell>
                                                        <Avatar>
                                                            <AvatarImage src={pkg.image} alt="Package image" />
                                                            <AvatarFallback>IMG</AvatarFallback>
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell>€{pkg.price}</TableCell>
                                                    <TableCell>{pkg.validity} days</TableCell>
                                                    <TableCell>Pending</TableCell>
                                                    <TableCell>
                            <span className="inline-flex items-center rounded-md bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              Inactive
                            </span>
                                                    </TableCell>
                                                    {(canEdit || canDelete) && (
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
                                                                    {canEdit && (
                                                                        <DropdownMenuItem>
                                                                            <Link href={`/admin/packages/${pkg.id}/edit`} className="flex w-full">
                                                                                Edit package
                                                                            </Link>
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                    {canDelete && (
                                                                        <>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem
                                                                                onClick={() => openDeleteDialog(pkg)}
                                                                                className="text-green-600"
                                                                            >
                                                                                Activate
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    )}
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
                            {currentPackage?.isActive
                                ? t('Are you sure you want to deactivate this package?')
                                : t('Are you sure you want to activate this package?')}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {currentPackage?.isActive
                                ? t('Deactivating will prevent new subscriptions but existing subscribers will keep their access until expiration.')
                                : t('Activating will make this package available for new subscriptions immediately.')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handlePatchStatus}
                            className={currentPackage?.isActive ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"}
                            disabled={patching}
                        >
                            {currentPackage?.isActive ? t('Deactivate') : t('Activate')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}