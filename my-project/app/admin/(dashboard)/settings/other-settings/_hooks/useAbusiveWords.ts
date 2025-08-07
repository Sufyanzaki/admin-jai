import {useSWRFix} from "@/shared-lib";
import {getAbusiveWords} from "../_api/abusiveWordsApi";

export const useAbusiveWords = () => {
const { data, loading, error, mutate } = useSWRFix<{word: string}>({
    key: 'abusive-words',
    fetcher: async () => {
        return await getAbusiveWords();
    }
});

return {
    word: data,
    wordLoading: loading,
    error,
    mutate
};
}; 