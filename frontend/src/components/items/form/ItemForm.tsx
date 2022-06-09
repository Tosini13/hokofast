import { Button, Stack, Typography, useTheme } from "@mui/material";
import TextField from "../../controlled/TextField";
import { Send } from "@mui/icons-material";
import { LoadingIcon } from "../../utils/Loading";
import Autocomplete from "../../controlled/Autocomplete";
import { useWorkspacesService } from "../../../services/workspaces/workspaces-service";
import { useCategoriesService } from "../../../services/categories/categories-service";
import { TItemForm, useItemForm } from "./useItemForm";
import { TWorkspace } from "../../../types/workspaces";

type TItemFormProps = {
  workspace: TWorkspace;
};

const ItemForm: React.FC<TItemFormProps> = ({ workspace }) => {
  const { handleSubmit, control, isProcessing } = useItemForm({
    workspace,
  });

  const { isProcessing: isProcessingSearch, workspaces } =
    useWorkspacesService();

  const { isProcessing: isProcessingCategories, categories } =
    useCategoriesService();

  const theme = useTheme();
  return (
    <form
      style={{
        flexGrow: 1,
        padding: "20px",
        backgroundColor: "#F2F2F2",
      }}
      onSubmit={handleSubmit}
    >
      <Stack
        spacing={2}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "250px",
          margin: "auto",
        }}
      >
        <TextField
          fullWidth
          name="name"
          placeholder={"Item name"}
          control={control}
          style={{ textAlign: "center", alignSelf: "center" }}
        />

        <Autocomplete<TItemForm, TItemForm["workspace"], boolean>
          name="workspace"
          control={control}
          size="small"
          loading={isProcessingSearch}
          options={workspaces}
          getOptionLabel={(option) => option?.name ?? ""}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          renderOption={(props, option) => {
            if (!option) {
              return null;
            }
            return (
              <li {...props} key={option.id}>
                <Typography>{option.name}</Typography>
              </li>
            );
          }}
          textFieldProps={{
            name: "searchWorkspace",
            placeholder: "Workspace",
            control: control,
            fullWidth: true,
            style: {
              textAlign: "center",
              alignSelf: "center",
            },
          }}
        />

        <Autocomplete<TItemForm, TItemForm["category"], boolean>
          name="category"
          control={control}
          size="small"
          loading={isProcessingCategories}
          options={categories}
          getOptionLabel={(option) => option?.name ?? ""}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          renderOption={(props, option) => {
            if (!option) {
              return null;
            }
            return (
              <li {...props} key={option.id}>
                <Typography>{option.name}</Typography>
              </li>
            );
          }}
          textFieldProps={{
            name: "searchCategory",
            placeholder: "Category",
            control: control,
            fullWidth: true,
            style: {
              textAlign: "center",
              alignSelf: "center",
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
};

export default ItemForm;
