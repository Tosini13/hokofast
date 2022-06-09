import axios from "axios";
import { useEffect, useState } from "react";
import { CATEGORIES_API_URL } from "../../models/endpoints";
import { TCategory } from "../../types/categories";
import useAsync from "../../utils/useAsync";

const getCategories = () =>
  axios.get<TCategory[]>(CATEGORIES_API_URL).then((data) => data);

export const useCategoriesService = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const { execute, isProcessing } = useAsync();

  useEffect(() => {
    async function fetchData() {
      const categories = await execute(getCategories());
      setCategories(categories.data);
    }
    fetchData();
  }, [execute]);

  return { categories, isProcessing };
};

type TAddCategoryProps = Omit<TCategory, "id" | "author">;
export const addCategory = async (data: TAddCategoryProps) =>
  await axios.post<TCategory>(CATEGORIES_API_URL, data);
