export type BasicSettings =  {
    id: string;
    systemLogo: string;
    systemName: string;
    memberPrefix: string;
    minimumAge: number;
    dateFormat: string;
    adminPanelTitle: string;
    loginImage: string;
    loginMessage: string;
    maintenanceMode: boolean;
    defaultCurrency: string;
    defaultLanguage: string;
    serverInformation: string;
    database: string;
    createdAt: string;
    updatedAt: string;
}

export type CurrencyDto = {
    id: string;
    currencyName: string;
    currencyCode: string;
    symbol: string;
    textDirection: 'ltr' | 'rtl';
    createdAt: string;
    updatedAt: string;
}

export type CurrencyFormatDto = {
    id: string;
    defaultCurrencyId: number;
    symbolFormat: 'prefix' | 'suffix';
    decimalSeparator: ',' | '.';
    decimalPlaces: number;
    createdAt: string;
    updatedAt: string;
    currency: CurrencyDto;
}

export type FooterSettingDto = {
    id: number;
    footerLogo: string;
    footerDescription: string;
    searchName: string;
    linkName: string;
    footerContent: string;
    createdAt: string;
    updatedAt: string;
    sections: FooterSectionDto[];
}

export type FooterSectionDto =  {
    id: string;
    sectionName: string;
    pageNames: string;
    createdAt: string;
    updatedAt: string;
}

export type ChatSettingDto = {
    id: string;
    messageLength: number;
    displayName: string;
    enableImages: boolean;
    enableVideos: boolean;
    enableFiles: boolean;
    fileExtensions: string;
    fileSizeLimit: number;
    noticeStyle: string;
    pageNoticeMessage: string;
    createdAt: string;
    updatedAt: string;
}


export type DashboardFooterResponse = {
    success: boolean;
    data: DashboardFooterDto;
}

export type DashboardFooterDto = {
    id: string;
    sectionPage: string;
    createdAt: string;
    updatedAt: string;
    pages: string;
}