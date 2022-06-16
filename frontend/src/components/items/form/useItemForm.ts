import { useForm } from "react-hook-form";
import { createItem } from "../../../services/items/actions";
import { Id } from "../../../types/utils";
import { TWorkspace } from "../../../types/workspaces";
import useAsync from "../../../utils/useAsync";

type TMockCategory = {
  id: Id;
  name: string;
};

export type TItemForm = {
  name: string;
  category: TMockCategory | null;
  searchCategory: string;
};

type TUseItemForm = {
  workspace: TWorkspace;
};

export const useItemForm = ({ workspace }: TUseItemForm) => {
  const { isProcessing, execute } = useAsync();

  const { handleSubmit, control, reset } = useForm<TItemForm>({
    defaultValues: {
      name: "",
      category: null,
      searchCategory: "",
    },
  });

  const onSubmit = async (data: TItemForm) => {
    try {
      const res = await execute(
        createItem(workspace.id, {
          name: data.name,
          category: data.category?.id,
        })
      );
      reset();
      console.log("res", res);
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
