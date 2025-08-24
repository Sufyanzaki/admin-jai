import {useSWRConfig} from "swr";
import useSWRMutation from "swr/mutation";
import {showError, showSuccess} from "@/shared-lib";
import {useState} from "react";
import {Currency, deleteCurrency} from "@/app/admin/(dashboard)/settings/other-settings/_api/currencies";
import { useTranslation } from "react-i18next";

export const useDeleteCurrency = () => {
  const { t } = useTranslation();
  const { mutate:globalMutate } = useSWRConfig();
  const [deletingIds, setDeletingIds] = useState<string[]>([]);

  const { trigger, isMutating } = useSWRMutation(
      "delete-currency",
      async (_, { arg }: { arg: { id: string } }) => {
        return await deleteCurrency(arg.id);
      },
      {
        onSuccess: () => showSuccess(t("Member deleted successfully!")),
        onError: (error) => {
          globalMutate("currencies");
          showError({ message: t(error.message) });
        }
      }
  );

  const deleteMemberById = async (id: string) => {
    setDeletingIds(prev => [...prev, id]);
    try {
      await trigger({ id });
      await globalMutate(
          "currencies",
          (currentData: Currency[] | undefined) => {
            if (!currentData) return currentData;
            return currentData.filter(currency => currency.id !== id);
          },
          false
      );
    } finally {
      setDeletingIds(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const isItemDeleting = (id: string) => deletingIds.includes(id);

  return {
    deleteMemberById,
    isDeleting: isMutating,
    isItemDeleting
  };
};
