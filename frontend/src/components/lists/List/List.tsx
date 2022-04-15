import { CircularProgress, Stack } from "@mui/material";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  createItem,
  useItemsService,
} from "../../../services/items/item-service";
import { Id } from "../../../types/utils";
import Item from "../../items/Item";

const withId = (Component: React.ComponentType<TListProps>) => {
  return () => {
    const { listId } = useParams();
    if (!listId) {
      return <CircularProgress />;
    }
    return <Component listId={listId} />;
  };
};

type TListProps = {
  listId: Id;
};

const List: React.FC<TListProps> = ({ listId }) => {
  const items = useItemsService(listId);

  const handleSubmit = useCallback(
    (name: string) => {
      createItem(listId, { name });
    },
    [listId]
  );

  return (
    <>
      <Stack
        spacing={1}
        style={{ backgroundColor: "#F2F2F2", flexGrow: 1, padding: "5px 20px" }}
      >
        {items?.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </Stack>
    </>
  );
};

const ListPage = withId(List);

export default ListPage;
