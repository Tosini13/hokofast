import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toPath } from "../../../routing/paths";
import { addWorkspace } from "../../../services/workspaces/workspaces-service";
import { Id } from "../../../types/utils";
import useAsync from "../../../utils/useAsync";

type TWorkspaceForm = {
  name: string;
  users: Id[];
};

export const useWorkspaceForm = () => {
  const { isProcessing, execute } = useAsync();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<TWorkspaceForm>({
    defaultValues: {
      name: "",
      users: [],
    },
  });

  const onSubmit = async (data: TWorkspaceForm) => {
    try {
      const res = await execute(addWorkspace(data));
      navigate(toPath.workspace(res.data.id));
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
