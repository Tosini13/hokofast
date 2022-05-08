import React from "react";
import { CircularProgress, Stack, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { useItemsService } from "../../../services/items/item-service";
import { Id } from "../../../types/utils";
import Item from "../../items/Item";

const StackContainer = styled(Stack)`
  background-color: #f2f2f2;
  flex-grow: 1;
  padding: 5px 20px;
  padding-top: 214px;
  padding-bottom: 65px;
`;

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
      <StackContainer spacing={1}>
        {items?.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </StackContainer>
    </>
  );
};

const ListPage = withId(List);

export default ListPage;
