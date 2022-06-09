import { useForm } from "react-hook-form";
import { createItem } from "../../../services/items/item-service";
import { Id } from "../../../types/utils";
import { TWorkspace } from "../../../types/workspaces";
import useAsync from "../../../utils/useAsync";

type TMockCategory = {
  id: Id;
  name: string;
};

export type TItemForm = {
  name: string;
  workspace: TWorkspace;
  searchWorkspace: string;
  category: TMockCategory | null;
  searchCategory: string;
};

type TUseItemForm = {
  workspace: TWorkspace;
};

export const useItemForm = ({ workspace }: TUseItemForm) => {
  const { isProcessing, execute } = useAsync();

  const { handleSubmit, control } = useForm<TItemForm>({
    defaultValues: {
      name: "",
      workspace,
      searchWorkspace: "",
      category: null,
      searchCategory: "",
    },
  });

  const onSubmit = async (data: TItemForm) => {
    try {
      const res = await execute(
        createItem(data.workspace.id, {
          name: data.name,
          category: data.category?.id,
        })
      );
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
