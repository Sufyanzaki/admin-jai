'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { useHome } from './useHome';
import { patchHomePageSettings } from '../_api/homeApi';
import { useEffect } from 'react';
import { imageUpload } from "@/admin-utils/utils/imageUpload";

const homeFormSchema = z.object({
  Title: z.string().min(1, "Title is required"),
  Url: z.string().min(1, "URL is required"),
  bannerTitle: z.string().min(1, "Banner title is required"),
  bannerSubTitle: z.string().min(1, "Banner subtitle is required"),
  bannerImage: z.any().optional(), // Can be File or string
  faqsTitle: z.string().min(1, "FAQs title is required"),
  faqsSubTitle: z.string().min(1, "FAQs subtitle is required"),
  faqsDescription: z.string().min(1, "FAQs description is required"),
  faqname: z.string().min(1, "FAQ name is required"),
  faqlatestTitle: z.string().min(1, "Latest title is required"),
  faqlatestSubTitle: z.string().min(1, "Latest subtitle is required"),
  blogTitle: z.string().min(1, "Blog title is required"),
  datingSiteTitle: z.string().min(1, "Dating site title is required"),
  datingSiteImageTitle1: z.string().min(1, "Dating site image title 1 is required"),
  datingSiteImage1: z.any().optional(), // Can be File or string
  datingSiteImageTitle2: z.string().min(1, "Dating site image title 2 is required"),
  datingSiteImage2: z.any().optional(), // Can be File or string
  datingSiteImageTitle3: z.string().min(1, "Dating site image title 3 is required"),
  datingSiteImage3: z.any().optional(), // Can be File or string
  datingSiteImageTitle4: z.string().min(1, "Dating site image title 4 is required"),
  datingSiteImage4: z.any().optional(), // Can be File or string
  showOnHeader: z.boolean().default(false),
});

export type HomeFormValues = z.infer<typeof homeFormSchema>;

export default function useHomeForm() {
  const { homeSettings, homeLoading, mutate } = useHome();

  const { trigger, isMutating } = useSWRMutation(
    'updateHomeSettings',
    async (url: string, { arg }: { arg: HomeFormValues }) => {
      return await patchHomePageSettings(arg);
    },
    {
      onError: (error: any) => {
        showError({ message: error.message });
        console.error('Home settings update error:', error);
      }
    }
  );

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    watch,
  } = useForm<HomeFormValues>({
    resolver: zodResolver(homeFormSchema),
    defaultValues: {
      Title: '',
      Url: '',
      bannerTitle: '',
      bannerSubTitle: '',
      bannerImage: '',
      faqsTitle: '',
      faqsSubTitle: '',
      faqsDescription: '',
      faqname: '',
      faqlatestTitle: '',
      faqlatestSubTitle: '',
      blogTitle: '',
      datingSiteTitle: '',
      datingSiteImageTitle1: '',
      datingSiteImage1: '',
      datingSiteImageTitle2: '',
      datingSiteImage2: '',
      datingSiteImageTitle3: '',
      datingSiteImage3: '',
      datingSiteImageTitle4: '',
      datingSiteImage4: '',
      showOnHeader: false,
    },
    mode: 'onBlur'
  });

  // Reset form when homeSettings data is loaded
  useEffect(() => {
    if (homeSettings) {
      reset({
        Title: homeSettings.Title || '',
        Url: homeSettings.Url || '',
        bannerTitle: homeSettings.bannerTitle || '',
        bannerSubTitle: homeSettings.bannerSubTitle || '',
        bannerImage: homeSettings.bannerImage || '',
        faqsTitle: homeSettings.faqsTitle || '',
        faqsSubTitle: homeSettings.faqsSubTitle || '',
        faqsDescription: homeSettings.faqsDescription || '',
        faqname: homeSettings.faqname || '',
        faqlatestTitle: homeSettings.faqlatestTitle || '',
        faqlatestSubTitle: homeSettings.faqlatestSubTitle || '',
        blogTitle: homeSettings.blogTitle || '',
        datingSiteTitle: homeSettings.datingSiteTitle || '',
        datingSiteImageTitle1: homeSettings.datingSiteImageTitle1 || '',
        datingSiteImage1: homeSettings.datingSiteImage1 || '',
        datingSiteImageTitle2: homeSettings.datingSiteImageTitle2 || '',
        datingSiteImage2: homeSettings.datingSiteImage2 || '',
        datingSiteImageTitle3: homeSettings.datingSiteImageTitle3 || '',
        datingSiteImage3: homeSettings.datingSiteImage3 || '',
        datingSiteImageTitle4: homeSettings.datingSiteImageTitle4 || '',
        datingSiteImage4: homeSettings.datingSiteImage4 || '',
        showOnHeader: homeSettings.showOnHeader || false,
      });
    }
  }, [homeSettings, reset]);

  const onSubmit = async (values: HomeFormValues) => {
    try {
      // Upload images and get URLs
      let bannerImageUrl = values.bannerImage;
      let datingSiteImage1Url = values.datingSiteImage1;
      let datingSiteImage2Url = values.datingSiteImage2;
      let datingSiteImage3Url = values.datingSiteImage3;
      let datingSiteImage4Url = values.datingSiteImage4;

      // Upload banner image if it's a File
      if (values.bannerImage instanceof File) {
        bannerImageUrl = await imageUpload(values.bannerImage);
      }

      // Upload dating site images if they are Files
      if (values.datingSiteImage1 instanceof File) {
        datingSiteImage1Url = await imageUpload(values.datingSiteImage1);
      }
      if (values.datingSiteImage2 instanceof File) {
        datingSiteImage2Url = await imageUpload(values.datingSiteImage2);
      }
      if (values.datingSiteImage3 instanceof File) {
        datingSiteImage3Url = await imageUpload(values.datingSiteImage3);
      }
      if (values.datingSiteImage4 instanceof File) {
        datingSiteImage4Url = await imageUpload(values.datingSiteImage4);
      }

      // Prepare the payload with uploaded image URLs
      const payload = {
        ...values,
        bannerImage: bannerImageUrl,
        datingSiteImage1: datingSiteImage1Url,
        datingSiteImage2: datingSiteImage2Url,
        datingSiteImage3: datingSiteImage3Url,
        datingSiteImage4: datingSiteImage4Url,
      };

      const result = await trigger(payload);
      if (result) {
        await mutate();
        showSuccess('Home settings updated successfully!');
      }
    } catch (error: any) {
      showError({ message: error.message });
      console.error('Home settings update error:', error);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    register,
    setValue,
    watch,
    homeSettings,
    homeLoading
  };
}
