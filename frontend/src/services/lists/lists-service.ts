import axios from "axios";
import { useEffect, useState } from "react";
import { QueryClient, QueryObserver } from "react-query";
import { LISTS_API_URL } from "../../models/api";
import { TList } from "../../models/backend";

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

  return lists;
};
