import {useSWRFix} from "@/shared-lib";
import {getAbusiveWords} from "../admin/(dashboard)/settings/other-settings/_api/abusiveWordsApi";

export const useAbusiveWords = () => {
const { data, loading, error, mutate } = useSWRFix<{word: string}>({
    key: 'abusive-words',
    fetcher: async () => {
        return await getAbusiveWords();
    }
});

return {
    words: data,
    wordLoading: loading,
    error,
    mutate
};
}; 