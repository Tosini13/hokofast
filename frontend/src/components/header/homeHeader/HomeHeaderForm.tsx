import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useCategoriesService } from "../../../services/categories/categories-service";
import { Id } from "../../../types/utils";
import Autocomplete from "../../controlled/Autocomplete";
import { THomeHeaderForm, useHomeHeaderForm } from "./useHomeHeaderform";

type THomeHeaderFormProps = {
  setCategory: (category: Id | undefined | null) => void;
};

const HomeHeaderForm: React.FC<THomeHeaderFormProps> = ({ setCategory }) => {
  const { isProcessing, categories } = useCategoriesService();

  const { control, watchFormData } = useHomeHeaderForm();
  const { category } = watchFormData;

  useEffect(() => {
    console.log("category", category);
    setCategory(category?.id);
  }, [setCategory, category]);

  return (
    <form>
      <Stack>
        <Autocomplete<THomeHeaderForm, THomeHeaderForm["category"], boolean>
          name="category"
          control={control}
          size="small"
          loading={isProcessing}
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
            style: {
              textAlign: "center",
              alignSelf: "center",
              maxWidth: "250px",
            },
          }}
        />
      </Stack>
    </form>
  );
};

export default HomeHeaderForm;
