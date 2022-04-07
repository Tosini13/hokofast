import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useItemsService } from "../../../services/items/item-service";
import { Id } from "../../../types/utils";
import ItemList from "./ItemList";

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
  return (
    <>
      <Typography>List</Typography>
      <Stack spacing={1} style={{ margin: "0px 20px" }}>
        {items?.map((item) => (
          <ItemList key={item.id} item={item} />
        ))}
      </Stack>
    </>
  );
};

const ListPage = withId(List);

export default ListPage;
