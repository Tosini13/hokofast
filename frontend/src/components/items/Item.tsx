import { Remove, ShoppingCart } from "@mui/icons-material";
import { IconButton, Stack, styled, Typography } from "@mui/material";
import React from "react";
import { deleteItem, editItem } from "../../services/items/item-service";
import ItemContainer, {
  ItemTypography,
  ItemTypographyBox,
} from "../../style/list/Item";
import { TItem } from "../../types/items";
import { Id } from "../../types/utils";

const TakenIcon = styled(IconButton)<{ taken: boolean }>`
  transition: all 0.3s !important;
  ${(props) =>
    props.taken
      ? `
      transform: translateX(0%) !important;
      opacity: 1;
      `
      : `
    opacity: 0;
    transform: translateX(10px) !important;
  `}
`;

type TItemProps = {
  item: TItem;
};

const Item: React.FC<TItemProps> = ({ item }) => {
  return (
    <ItemContainer
      onClick={() =>
        editItem(item.workspace, item.id, { ...item, taken: !item.taken })
      }
      highlited={item.taken}
    >
      <Stack direction={"row"} alignItems="center" spacing={1}>
        <ItemTypography style={{ flexGrow: 1 }}>{item.name}</ItemTypography>
        {item.qty && (
          <ItemTypographyBox>
            <ItemTypography>{item.qty}</ItemTypography>
          </ItemTypographyBox>
        )}
        <TakenIcon taken={item.taken}>
          <ShoppingCart />
        </TakenIcon>
        <IconButton onClick={() => deleteItem(item.workspace, item.id)}>
          <Remove />
        </IconButton>
      </Stack>
    </ItemContainer>
  );
};

export default Item;
