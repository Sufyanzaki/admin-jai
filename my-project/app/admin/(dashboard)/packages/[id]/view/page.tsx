"use client"
import { useTranslation } from "react-i18next";

import {Button} from "@/components/admin/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/admin/ui/tabs"
import {Badge} from "@/components/admin/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/admin/ui/avatar"
import {Progress} from "@/components/admin/ui/progress"
import {ArrowLeft, Box, Calendar, CreditCard, Edit, Phone, Star, Users} from "lucide-react"
import Link from "next/link"
import React, {use} from "react"
import Preloader from "@/components/shared/Preloader";
import useAllMembers from "@/app/admin/(dashboard)/members/_hooks/useAllMembers";
import usePackageById from "@/app/shared-hooks/usePackageById";

export default function PackageDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const {id} = use(params)
    const packageId = Number.parseInt(id)
    const { pkg, loading, error } = usePackageById(packageId);
        const { t } = useTranslation();
    const {data, isLoading} = useAllMembers();

    if (loading) return(
        <div className="flex items-center flex-col justify-center h-64">
            <Preloader/>
            <p className="text-sm">{t('Package Loading')}</p>
        </div>
    );
    if (error) return <div className="p-6 text-red-500">{t('Failed to load package.')}</div>;
    if (!pkg) return <div className="p-6 text-muted-foreground">{t('Package not found.')}</div>;

    return (
        <div className="flex flex-col gap-5 p-4 xl:p-6">
            <div className="flex items-center gap-2">
                <Link href="/admin/packages">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">{pkg.name}</h2>
                <Badge
                    className={
                        pkg.isActive
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                >
                    {pkg.isActive ? t('Active') : t('Inactive')}
                </Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('Subscribers')}</CardTitle>
                        <Users className="size-8 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">00</div>
                        <p className="text-xs text-muted-foreground">{t('+00 from last month')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('Monthly Revenue')}</CardTitle>
                        <CreditCard className="size-8 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">€0</div>
                        <p className="text-xs text-muted-foreground">{t('+0% from last month')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('Renewal Rate')}</CardTitle>
                        <Calendar className="size-8 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">00%</div>
                        <p className="text-xs text-muted-foreground">{t('+0% from last quarter')}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="md:grid gap-4 max-md:space-y-4 md:grid-cols-3">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>{t('Package Information')}</CardTitle>
                        <CardDescription>{t('Details about the')} {pkg.name} {t('package')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Box className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{t('Price')}: €{pkg.price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{t('Duration')}: {pkg.validity} {t('days')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{t('Popularity')}: {t('High')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{t('Support')}: {pkg.price === 0 ? t('Community') : t('Priority')}</span>
                        </div>
                        <div className="pt-4">
                            <h4 className="mb-2 text-sm font-medium">{t('Subscription Growth')}</h4>
                            <Progress value={25} className="h-2" />
                            <p className="mt-1 text-xs text-muted-foreground">{25}% {t('increase this quarter')}</p>
                        </div>
                        <div className="flex gap-2 pt-4 flex-wrap">
                            <Link href={`/admin/packages/${pkg.id}/edit`}>
                                <Button variant="outline" size="sm">
                                    <Edit className="mr-2 h-4 w-4" />
                                    {t('Edit Package')}
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>{t('Package Overview')}</CardTitle>
                        <CardDescription>{t('Key information and statistics')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="features">
                            <TabsList className="mb-4">
                                <TabsTrigger value="features">{t('Features')}</TabsTrigger>
                                <TabsTrigger value="subscribers">{t('Top Subscribers')}</TabsTrigger>
                            </TabsList>
                            <TabsContent value="features">
                                <div className="space-y-4">
                                    {pkg.features.split(',').map((feature: string, i: number) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="flex items-center justify-center rounded-md bg-primary/10 p-2">
                                                <Star className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">{feature}</h4>
                                                <p className="text-xs text-muted-foreground">
                                                    {t(["Essential functionality","Core feature","Advanced capability","Premium benefit"][i % 4])}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <Link href={`/packages/features`}>
                                        <Button variant="outline" className="w-full mt-2">
                                            {t('Compare All Features')}
                                        </Button>
                                    </Link>
                                </div>
                            </TabsContent>
                            <TabsContent value="subscribers">
                                <div className="space-y-4">
                                    {isLoading ? <div className="flex items-center flex-col justify-center h-64">
                                        <Preloader/>
                                        <p className="text-sm">{t('Loading Subscribers')}</p>
                                    </div>: data?.users
                                        ?.map((user, i) => (
                                            <div key={user.id} className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage
                                                            src={user.image || `/placeholder-user.png`}
                                                            alt={user.firstName}
                                                        />
                                                        <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h4 className="text-sm font-medium">
                                                            {user.firstName} {user.lastName}
                                                        </h4>
                                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                                    </div>
                                                </div>
                                                <Badge variant="outline">
                                                    {Math.floor((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30))} {t('months')}
                                                </Badge>
                                            </div>
                                        ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}