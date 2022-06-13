import React from "react";
import { Stack, styled } from "@mui/material";
import { TItem } from "../../types/items";
import Item from "./Item";

const StackContainer = styled(Stack)`
  flex-grow: 1;
  padding: 5px 20px;
  padding-bottom: 65px;
  transition: all 0.3s;
`;

type TItemsListProps = {
  items: TItem[];
};

const ItemsList: React.FC<TItemsListProps> = ({ items }) => {
  return (
    <>
      <StackContainer spacing={1}>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </StackContainer>
    </>
  );
};

export default ItemsList;
