import { useForm } from "react-hook-form";
import { addList } from "../../../services/lists/lists-service";

type TListForm = {
  name: string;
};

export const useListForm = () => {
  const { handleSubmit, control } = useForm<TListForm>();

  const onSubmit = async (data: TListForm) => {
    try {
      await addList({ name: data.name });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
  };
};
