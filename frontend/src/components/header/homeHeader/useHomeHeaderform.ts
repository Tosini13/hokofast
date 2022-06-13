import { useForm } from "react-hook-form";
import { TCategory } from "../../../types/categories";

export type THomeHeaderForm = {
  category: TCategory | null;
  searchCategory: string;
};

export const useHomeHeaderForm = () => {
  const { control, watch } = useForm<THomeHeaderForm>({
    defaultValues: {
      category: null,
    },
  });

  return {
    control,
    watchFormData: {
      category: watch("category") ?? null,
    },
  };
};
