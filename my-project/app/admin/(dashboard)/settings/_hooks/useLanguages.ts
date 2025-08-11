"use client"

import {useSWRFix} from "@/shared-lib";
import {useSession} from "next-auth/react";
import { getLanguages } from "../_api/languageApi";
import {BasicLanguageDto} from "@/app/shared-types/basic-languages";

export function useLanguages() {
  const { data: session } = useSession();

  const { data, loading, error, mutate } = useSWRFix<BasicLanguageDto[]>({
    key: session?.token ? "languages-list" : "",
    fetcher: async () => {
      return await getLanguages();
    },
  });

  return {
    languages: data,
    languagesLoading: loading,
    error,
    mutate,
  };
} 