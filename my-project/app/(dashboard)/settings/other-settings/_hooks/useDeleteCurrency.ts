import {useSWRConfig} from "swr";
import useSWRMutation from "swr/mutation";
import {showError, showSuccess} from "@/admin-utils";
import {useState} from "react";
import {Currency, deleteCurrency} from "@/app/(dashboard)/settings/other-settings/_api/currencies";

export const useDeleteCurrency = () => {
  const { mutate:globalMutate } = useSWRConfig();
  const [deletingIds, setDeletingIds] = useState<string[]>([]);

  const { trigger, isMutating } = useSWRMutation(
      "delete-currency",
      async (_, { arg }: { arg: { id: string } }) => {
        return await deleteCurrency(arg.id);
      },
      {
        onSuccess: () => showSuccess("Member deleted successfully!"),
        onError: (error) => {
          globalMutate("currencies");
          showError({ message: error.message });
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
