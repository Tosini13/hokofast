import { Button, Stack, styled, Typography } from "@mui/material";
import TextField from "../../controlled/TextField";
import { LoadingIcon } from "../../utils/Loading";
import Autocomplete from "../../controlled/Autocomplete";
import { useCategoriesService } from "../../../services/categories/categories-service";
import { TItemForm, useItemForm } from "./useItemForm";
import { TWorkspace } from "../../../types/workspaces";
import { Add } from "@mui/icons-material";

const StackContainer = styled(Stack)`
  padding: 5px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 7px 0px rgb(0 0 0 / 20%);
`;

const inputStyle = {
  backgroundColor: "#eee",
  padding: "0px 4px",
  boxShadow: "none",
  margin: "0px",
};

export const ButtonStyled = styled(Button)`
  min-width: 45px;
  padding: 6px 6px;
`;

type TItemFormProps = {
  workspace: TWorkspace;
};

const ItemForm: React.FC<TItemFormProps> = ({ workspace }) => {
  const { handleSubmit, control, isProcessing } = useItemForm({
    workspace,
  });

  const { isProcessing: isProcessingCategories, categories } =
    useCategoriesService();

  return (
    <form style={{ alignSelf: "center" }} onSubmit={handleSubmit}>
      <StackContainer direction={"row"} spacing={2}>
        <Stack spacing={1}>
          <TextField
            fullWidth
            name="name"
            placeholder={"Item name"}
            control={control}
            style={inputStyle}
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
              style: inputStyle,
            }}
          />
        </Stack>
        <ButtonStyled color="secondary" variant="contained" type="submit">
          {isProcessing ? <LoadingIcon mode="light" /> : <Add />}
        </ButtonStyled>
      </StackContainer>
    </form>
  );
};

export default ItemForm;
