import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../../models/backend";
import { toPath } from "../../../routing/paths";
import { addWorkspace } from "../../../services/workspaces/workspaces-service";
import useAsync from "../../../utils/useAsync";

export type TWorkspaceForm = {
  name: string;
  users: TUser[];
  search: string;
};

export const useWorkspaceForm = () => {
  const { isProcessing, execute } = useAsync();
  const navigate = useNavigate();

  const { handleSubmit, control, watch } = useForm<TWorkspaceForm>({
    defaultValues: {
      name: "",
      users: [],
    },
  });

  const onSubmit = async (data: TWorkspaceForm) => {
    try {
      const res = await execute(
        addWorkspace({
          name: data.name,
          users: data.users.map((user) => user.id),
        })
      );
      navigate(toPath.workspace(res.data.id));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
    isProcessing,
    watchFormData: {
      search: watch("search") ?? "",
    },
  };
};
