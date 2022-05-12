import { useForm } from "react-hook-form";
import { createItem } from "../../../services/items/item-service";
import useAsync from "../../../utils/useAsync";

type TItemForm = {
  name: string;
  amount: string;
};

export const useItemForm = (listId: string) => {
  const { isProcessing, execute } = useAsync();

  const { handleSubmit, control, reset } = useForm<TItemForm>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: TItemForm) => {
    try {
      await execute(createItem(listId, { name: data.name }));
      reset();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
    isProcessing,
  };
};
