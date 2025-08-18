type RevenueByGender = Record<string, number>;

type MonthlyRevenue = {
    month: string;
    revenue: number;
};

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
};

type Package = {
    id: number;
    name: string;
    price: number;
};

export type UserPackageDto = {
    id: number;
    userId: number;
    packageId: number;
    purchaseDate: string;
    startDate: string;
    endDate: string;
    priceAtPurchase: number;
    status: string;
    transactionId: string;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    user: User;
    package: Package;
};

export type RevenueDataDto = {
    totalPayments: number;
    activePackages: number;
    thisMonthPayments: number;
    lastMonthPayments: number;
    thisYearPayments: number;
    lastYearPayments: number;
    yearDifferencePercent: number | null;
    revenueByGender: RevenueByGender;
    monthlyRevenue: MonthlyRevenue[];
    lastTenUserPackages: UserPackageDto[];
};