import React from "react";
import { CircularProgress, Stack, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { useItemsService } from "../../../services/items/item-service";
import { Id } from "../../../types/utils";
import Item from "../../items/Item";

const StackContainer = styled(Stack)<{ islower?: boolean }>`
  background-color: #f2f2f2;
  flex-grow: 1;
  padding: 5px 20px;
  padding-top: ${(props) => (props.islower ? "316px;" : "214px;")}
  padding-bottom: 65px;
  transition: all 0.3s;
`;

const withId = (Component: React.ComponentType<TListProps>) => {
  return (props: Omit<TListProps, "listId">) => {
    const { listId } = useParams();
    if (!listId) {
      return <CircularProgress />;
    }
    return <Component {...props} listId={listId} />;
  };
};

type TListProps = {
  listId: Id;
  isLower?: boolean;
};

const List: React.FC<TListProps> = ({ listId, isLower }) => {
  const items = useItemsService(listId);
  return (
    <>
      <StackContainer spacing={1} islower={isLower}>
        {items?.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </StackContainer>
    </>
  );
};

const ListPage = withId(List);

export default ListPage;
