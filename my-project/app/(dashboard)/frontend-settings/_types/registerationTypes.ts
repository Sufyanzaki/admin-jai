export type RegistrationSettingDto = {
    id: number;
    Title: string;
    Url: string;
    bannerImage: string;
  
    step1Title: string;
    step1Description: string;
  
    step2Title: string;
    step2Description: string;
  
    step3Title: string;
    step3Description: string;
  
    step4Title: string;
    step4Description: string;
  
    myImageTitle: string;
    myImageDescription: string;
  
    myDescriptionTitle: string;
    myDescriptionPlaceholder: string;
  
    step5Title: string;
    step5Description: string;
  
    step6Title: string;
    step6Description: string;
  
    step7Title: string;
    step7Description: string;
  
    showOnHeader: boolean;
    isActive: boolean;
    createdAt: string; // or Date
    updatedAt: string; // or Date
  };
  