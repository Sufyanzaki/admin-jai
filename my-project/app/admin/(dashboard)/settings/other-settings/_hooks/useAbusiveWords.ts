import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getAbusiveWords } from "../_api/getAbusiveWords";

export const useAbusiveWords = () => {
const { data, loading, error, mutate } = useSWRFix<{word: string}>({
    key: 'abusive-words',
    fetcher: async () => {
    const response = await getAbusiveWords();
    return response;
    }
});

return {
    word: data,
    wordLoading: loading,
    error,
    mutate
};
}; 