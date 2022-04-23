import { useForm } from "react-hook-form";

type TSearchForm = {
  search: string;
};

export const useSearchForm = () => {
  const { handleSubmit, control } = useForm<TSearchForm>();

  const onSubmit = async (data: TSearchForm) => {
    try {
      console.log("data", data);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
  };
};
