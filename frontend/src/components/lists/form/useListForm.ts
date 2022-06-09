import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toPath } from "../../../routing/paths";
import { addList } from "../../../services/lists/lists-service";
import { Id } from "../../../types/utils";
import { TWorkspace } from "../../../types/workspaces";
import useAsync from "../../../utils/useAsync";

type TMockCategory = {
  id: Id;
  name: string;
};

export type TListForm = {
  name: string;
  workspace: TWorkspace | null;
  searchWorkspace: string;
  category: TMockCategory | null;
  searchCategory: string;
};

export const useListForm = () => {
  const { isProcessing, execute } = useAsync();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<TListForm>({
    defaultValues: {
      name: "",
      workspace: null,
      searchWorkspace: "",
      category: null,
      searchCategory: "",
    },
  });

  const onSubmit = async (data: TListForm) => {
    try {
      const res = await execute(addList({ name: data.name }));
      console.log("res", res);
      navigate(toPath.list(res.data.id));
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
