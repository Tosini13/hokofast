import axios from "axios";
import { useEffect, useState } from "react";
import { QueryClient, QueryObserver } from "react-query";
import { LISTS_API_URL, LIST_API_URL } from "../../models/endpoints";
import { TList } from "../../models/backend";
import { mockLists } from "./mock";

const getLists = () =>
  axios.get<TList[]>(LISTS_API_URL).then((data) => data.data);

export const useListsService = () => {
  const [lists, setLists] = useState<TList[]>();

  useEffect(() => {
    const queryClient = new QueryClient();
    queryClient.setQueryDefaults("lists", { queryFn: getLists });
    const observer = new QueryObserver<{ data: TList[] }>(queryClient, {
      queryKey: "lists",
    });

    observer.subscribe((lists) => {
      setLists(lists.data?.data);
    });
  }, []);

  return lists?.length ? lists : mockLists;
};

export const editList = async (
  listId: string,
  data: Omit<TList, "id" | "dateTime">
) => {
  await axios.put(LIST_API_URL(listId), data);
};

export const addList = async (data: Omit<TList, "id" | "dateTime">) => {
  await axios.post(LISTS_API_URL, data);
};
