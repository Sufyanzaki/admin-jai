"use client";

import {useState} from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/admin/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/admin/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu";
import {Badge} from "@/components/admin/ui/badge";
import {Input} from "@/components/admin/ui/input";
import {Button} from "@/components/admin/ui/button";
import {Loader2, MoreHorizontal, Search, UserPlus} from "lucide-react";
import {useBanners} from "./_hooks/useBanners";
import {format} from "date-fns";
import {useDeleteBanner} from "./_hooks/useDeleteBanner";
import { useSession } from "next-auth/react";


export default function BannerListPage() {

    const { data: session } = useSession();
    const { t } = useTranslation();

    const { banners, bannersLoading, error } = useBanners();
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { deleteBannerById, isDeleting } = useDeleteBanner();

    const filteredBanners = banners?.filter(banner =>
        banner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.page.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd-MM-yyyy');
        } catch {
            return t('Invalid Date');
        }
    };

    if (bannersLoading) {
        return (
            <div className="flex flex-col gap-6 p-4 xl:p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>{t('Loading banners...')}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col gap-6 p-4 xl:p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-red-500 mb-2">{t('Error loading banners')}</p>
                        <p className="text-sm text-muted-foreground">{error.message}</p>
                    </div>
                </div>
            </div>
        );
    }

    let permissions;
    if (session?.user.permissions) {
        permissions = session.user.permissions.find(permission => permission.module === "newsletter");
    }

    // Permission flags
    const canCreate = permissions?.canCreate ?? true;
    const canEdit = permissions?.canEdit ?? true;
    const canDelete = permissions?.canDelete ?? true;
    const canView = permissions?.canView ?? true;

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">{t('Manage Banners')}</h2>
                    <p className="text-muted-foreground">{t('View, edit, and track your active banners')}</p>
                </div>
                {canCreate && (
                    <div className="flex items-center flex-wrap gap-2">
                        <Button asChild className="w-full sm:w-fit">
                            <Link href="/admin/marketing/banners/add">
                                <UserPlus className="mr-2 h-4 w-4" />
                                {t('Add New')}
                            </Link>
                        </Button>
                    </div>
                )}
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle>{t('All Banners')}</CardTitle>
                        {canView && (
                            <div className="relative mt-2 sm:mt-0">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search banners"
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent>
                    {canView ? (
                        <Table className="whitespace-nowrap">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>{t('Name')}</TableHead>
                                    <TableHead>{t('CPM')}</TableHead>
                                    <TableHead>{t('Start Date')}</TableHead>
                                    <TableHead>{t('End Date')}</TableHead>
                                    <TableHead>{t('Status')}</TableHead>
                                    <TableHead>{t('Created')}</TableHead>
                                    <TableHead>{t('Page')}</TableHead>
                                    {(canEdit || canDelete) && (
                                        <TableHead className="text-right">{t('Option')}</TableHead>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBanners.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={(canEdit || canDelete) ? 9 : 8}
                                            className="h-24 text-center"
                                        >
                                            {t('No banners found.')}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredBanners.map((banner) => (
                                        <TableRow key={banner.id}>
                                            <TableCell>{banner.id}</TableCell>
                                            <TableCell>{banner.name}</TableCell>
                                            <TableCell>${banner.cpm.toFixed(2)}</TableCell>
                                            <TableCell>{formatDate(banner.startDate)}</TableCell>
                                            <TableCell>{formatDate(banner.endDate)}</TableCell>
                                            <TableCell>
                                                <Badge variant={banner.isActive ? "default" : "secondary"}>
                                                    {banner.isActive ? t("Active") : t("Inactive")}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{formatDate(banner.createdAt)}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{banner.page}</Badge>
                                            </TableCell>
                                            {(canEdit || canDelete) && (
                                                <TableCell className="text-right">
                                                    {isDeleting && deletingId === String(banner.id) ? (
                                                        <div className="flex items-center justify-center h-10">
                                                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                                        </div>
                                                    ) : (
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Open menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/admin/marketing/banners/${banner.id}`}>
                                                                        {t('View Details')}
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                {canEdit && (
                                                                    <DropdownMenuItem asChild>
                                                                        <Link href={`/admin/marketing/banners/${banner.id}/edit`}>
                                                                            {t('Edit Banner')}
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {canDelete && (
                                                                    <DropdownMenuItem
                                                                        onClick={async () => {
                                                                            setDeletingId(String(banner.id));
                                                                            await deleteBannerById(String(banner.id));
                                                                            setDeletingId(null);
                                                                        }}
                                                                    >
                                                                        {t('Deactivate')}
                                                                    </DropdownMenuItem>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    )}
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="flex items-center justify-center h-32">
                            <p className="text-muted-foreground">{t("You don't have permission to view banners.")}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            {/*<PaginationSection />*/}
        </div>
    );
}