'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from 'react'; // Added useState
import { patchContactPageSettings } from '../_api/contactApi';
import { useContact } from './useContact';
import { imageUpload } from '@/admin-utils/utils/imageUpload';

const contactFormSchema = z.object({
  contactName: z.string().min(1, 'Contact name is required'),
  contactBannerImage: z.any().optional(), // Accept File or string
  bannerTitle: z.string().min(1, 'Banner title is required'),
  bannerSubTitle: z.string().min(1, 'Banner subtitle is required'),
  bannerDescription: z.string().min(1, 'Banner description is required'),
  addressName: z.string().min(1, 'Address name is required'),
  addressValue: z.string().min(1, 'Address value is required'),
  phoneName: z.string().min(1, 'Phone name is required'),
  phoneValue: z.string().min(1, 'Phone value is required'),
  emailName: z.string().min(1, 'Email name is required'),
  emailValue: z.string().min(1, 'Email value is required'),
  contactFormTitle: z.string().min(1, 'Contact form title is required'),
  contactFormDescription: z.string().min(1, 'Contact form description is required'),
  showOnHeader: z.boolean(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function useContactForm() {
  const { contactSettings, mutate, contactLoading } = useContact();
  const [isUploading, setIsUploading] = useState(false); // New state for image upload

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactName: '',
      bannerTitle: '',
      bannerSubTitle: '',
      bannerDescription: '',
      addressName: '',
      addressValue: '',
      phoneName: '',
      phoneValue: '',
      emailName: '',
      emailValue: '',
      contactFormTitle: '',
      contactFormDescription: '',
      showOnHeader: true,
    },
  });

  const { trigger, isMutating } = useSWRMutation(
      'updateContactSettings',
      async (url: string, { arg }: { arg: ContactFormValues }) => {
        return await patchContactPageSettings(arg);
      },
      {
        onError: (error: any) => {
          showError({ message: error.message });
          console.error('Contact settings update error:', error);
        }
      }
  );

  // Reset form with fetched data
  useEffect(() => {
    if (contactSettings) {
      reset({
        contactName: contactSettings.contactName || '',
        contactBannerImage: contactSettings.contactBannerImage || '',
        bannerTitle: contactSettings.bannerTitle || '',
        bannerSubTitle: contactSettings.bannerSubTitle || '',
        bannerDescription: contactSettings.bannerDescription || '',
        addressName: contactSettings.addressName || '',
        addressValue: contactSettings.addressValue || '',
        phoneName: contactSettings.phoneName || '',
        phoneValue: contactSettings.phoneValue || '',
        emailName: contactSettings.emailName || '',
        emailValue: contactSettings.emailValue || '',
        contactFormTitle: contactSettings.contactFormTitle || '',
        contactFormDescription: contactSettings.contactFormDescription || '',
        showOnHeader: contactSettings.showOnHeader ?? true,
      });
    }
  }, [contactSettings, reset]);

  const onSubmit = async (values: ContactFormValues) => {
    try {
      let contactBannerImageUrl = values.contactBannerImage;

      // Start image upload loading
      if (values.contactBannerImage instanceof File) {
        setIsUploading(true);
        contactBannerImageUrl = await imageUpload(values.contactBannerImage);
        setIsUploading(false);
      }

      const payload = {
        ...values,
        contactBannerImage: contactBannerImageUrl,
      };

      const result = await trigger(payload);
      if (result) {
        await mutate();
        showSuccess('Contact settings updated successfully!');
      }
    } catch (error) {
      setIsUploading(false);
      showError({ message: 'Failed to upload image' });
      console.error('Image upload error:', error);
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    errors,
    isLoading: isMutating || isUploading, // Combined loading state
    isUploading, // Separate image upload state
    isFormSubmitting: isMutating, // Separate form submission state
    onSubmit,
    contactSettings,
    contactLoading
  };
}