import axios from "axios";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryObserver } from "react-query";
import {
  LISTS_API_URL,
  LISTS_GUEST_API_URL,
  LIST_API_URL,
} from "../../models/endpoints";
import { TList } from "../../models/backend";
import { Id } from "../../types/utils";

const getLists = () =>
  axios.get<TList[]>(LISTS_API_URL).then((data) => data.data);

const getListsGuest = () =>
  axios.get<TList[]>(LISTS_GUEST_API_URL).then((data) => data.data);

export const useListsService = () => {
  const [myLists, setMyLists] = useState<TList[] | undefined>();
  const [guestLists, setGuestLists] = useState<TList[] | undefined>();

  useEffect(() => {
    const queryClient = new QueryClient();
    queryClient.setQueryDefaults("lists", { queryFn: getLists });
    const observer = new QueryObserver<{ data: TList[] }>(queryClient, {
      queryKey: "lists",
    });

    observer.subscribe((lists) => {
      setMyLists(lists.data?.data ?? []);
    });
  }, []);

  useEffect(() => {
    const queryClient = new QueryClient();
    queryClient.setQueryDefaults("lists-guest", { queryFn: getListsGuest });
    const observer = new QueryObserver<{ data: TList[] }>(queryClient, {
      queryKey: "lists-guest",
    });

    observer.subscribe((lists) => {
      setGuestLists(lists.data?.data ?? []);
    });
  }, []);

  const lists = React.useMemo(
    () => [...(myLists ?? []), ...(guestLists ?? [])],
    [myLists, guestLists]
  );

  return { myLists, guestLists, lists };
};

export const editList = async (
  listId: Id,
  data: Omit<TList, "id" | "dateTime">
) => {
  await axios.put(LIST_API_URL(listId), data);
};

export const addList = async (data: Omit<TList, "id" | "dateTime">) =>
  await axios.post<TList>(LISTS_API_URL, data);

export const deleteList = async (listId: Id) =>
  await axios.delete(LIST_API_URL(listId));
