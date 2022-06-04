import { Button, Stack, Typography, useTheme } from "@mui/material";
import TextField from "../controlled/TextField";
import { TListForm, useListForm } from "./form/useListForm";
import { Send } from "@mui/icons-material";
import { LoadingIcon } from "../utils/Loading";
import Autocomplete from "../controlled/Autocomplete";
import { useWorkspacesService } from "../../services/workspaces/workspaces-service";
import { useCategoriesService } from "../../services/categories/categories-service";

type TListFormProps = {};

const ListForm: React.FC<TListFormProps> = () => {
  const { handleSubmit, control, isProcessing } = useListForm();

  const { isProcessing: isProcessingSearch, workspaces } =
    useWorkspacesService();

  const { isProcessing: isProcessingCategories, categories } =
    useCategoriesService();

  console.log("categories", categories);

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
          placeholder={"List name"}
          control={control}
          style={{ textAlign: "center", alignSelf: "center" }}
        />

        <Autocomplete<TListForm, TListForm["workspace"], boolean>
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

        <Autocomplete<TListForm, TListForm["category"], boolean>
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

export default ListForm;
