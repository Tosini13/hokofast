import { useContext, useEffect, useState } from "react";
import { Send } from "@mui/icons-material";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import TextField from "../../controlled/TextField";
import { LoadingIcon } from "../../utils/Loading";
import { TWorkspaceForm, useWorkspaceForm } from "./useWorkspaceForm";
import { getUsers } from "../../../services/users/users.service";
import { TUser } from "../../../models/backend";
import useAsync from "../../../utils/useAsync";
import Autocomplete from "../../controlled/Autocomplete";
import { observer } from "mobx-react";
import { AuthStoreContext } from "../../../stores/authStore";

type TWorkspaceFormProps = {};

const WorkspaceForm: React.FC<TWorkspaceFormProps> = observer(() => {
  const authStore = useContext(AuthStoreContext);

  const [users, setUsers] = useState<TUser[]>([]);
  const { handleSubmit, control, isProcessing, watchFormData } =
    useWorkspaceForm();
  const { search } = watchFormData;
  const theme = useTheme();
  const { isProcessing: isProcessingUsers, execute } = useAsync();

  useEffect(() => {
    async function fetchData() {
      const users: any = await execute(getUsers({ nickname: search }));
      setUsers(users.filter((user: any) => user.id !== authStore.userId));
    }
    if (search.length > 1) {
      fetchData();
    }
  }, [search, execute, authStore.userId]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={2}
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <TextField
          fullWidth
          name="name"
          placeholder={"Workspace name"}
          control={control}
          style={{
            textAlign: "center",
            alignSelf: "center",
            maxWidth: "250px",
          }}
        />

        <Autocomplete<TWorkspaceForm, TUser, boolean>
          multiple
          name="users"
          control={control}
          size="small"
          loading={isProcessingUsers}
          options={users}
          getOptionLabel={(option) => option.nickname}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                <Typography>{option.nickname}</Typography>
                <Typography variant="body2" color={"gray"} paddingLeft="2px">
                  ({option.email})
                </Typography>
              </li>
            );
          }}
          textFieldProps={{
            name: "search",
            placeholder: "Users",
            control: control,
            style: {
              textAlign: "center",
              alignSelf: "center",
              maxWidth: "250px",
            },
          }}
        />

        <Button
          color="secondary"
          variant="contained"
          type="submit"
          style={{ alignSelf: "center" }}
          startIcon={
            isProcessing ? (
              <LoadingIcon
                color="secondary"
                customColor={theme.palette.primary.contrastText}
              />
            ) : (
              <Send />
            )
          }
        >
          Save
        </Button>
      </Stack>
    </form>
  );
});

export default WorkspaceForm;
