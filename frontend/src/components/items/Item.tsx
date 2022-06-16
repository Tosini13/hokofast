import { Remove, ShoppingCart } from "@mui/icons-material";
import { IconButton, Stack, styled } from "@mui/material";
import React, { useCallback } from "react";
import { deleteItem, editItem } from "../../services/items/actions";
import ItemContainer, {
  ItemTypography,
  ItemTypographyBox,
} from "../../style/list/Item";
import { TItem } from "../../types/items";
import useAsync from "../../utils/useAsync";
import { LoadingIcon } from "../utils/Loading";

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
  const { execute, isProcessing } = useAsync();
  const onClickItem = useCallback(() => {
    if (!isProcessing) {
      execute(
        editItem(item.workspace, item.id, { ...item, taken: !item.taken })
      );
    }
  }, [item, execute, isProcessing]);

  return (
    <ItemContainer onClick={onClickItem} highlited={item.taken}>
      <Stack direction={"row"} alignItems="center" spacing={1}>
        <ItemTypography style={{ flexGrow: 1 }}>{item.name}</ItemTypography>
        {item.qty && (
          <ItemTypographyBox>
            <ItemTypography>{item.qty}</ItemTypography>
          </ItemTypographyBox>
        )}

        <TakenIcon taken={item.taken || isProcessing}>
          {isProcessing ? <LoadingIcon /> : <ShoppingCart />}
        </TakenIcon>
        <IconButton onClick={() => deleteItem(item.workspace, item.id)}>
          <Remove />
        </IconButton>
      </Stack>
    </ItemContainer>
  );
};

export default Item;
