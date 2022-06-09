import React from "react";
import { Stack, styled } from "@mui/material";
import { TItem } from "../../types/items";
import Item from "./Item";
import { Id } from "../../types/utils";

const StackContainer = styled(Stack)`
  flex-grow: 1;
  padding: 5px 20px;
  padding-bottom: 65px;
  transition: all 0.3s;
`;

type TItemsListProps = {
  workspaceId: Id;
  items: TItem[];
  isLower?: boolean;
};

const ItemsList: React.FC<TItemsListProps> = ({
  workspaceId,
  items,
  isLower,
}) => {
  return (
    <>
      <StackContainer spacing={1}>
        {items.map((item) => (
          <Item key={item.id} item={item} workspaceId={workspaceId} />
        ))}
      </StackContainer>
    </>
  );
};

export default ItemsList;
