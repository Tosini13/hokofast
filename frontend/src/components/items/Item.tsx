import { Remove, ShoppingCart } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  styled,
  Typography,
  PaperProps,
} from "@mui/material";
import React from "react";
import { deleteItem, editItem } from "../../services/items/item-service";
import { TItem } from "../../types/items";
import { Id } from "../../types/utils";
import { PaperStyled } from "../lists/Lists";

const PaperContainer = styled(PaperStyled)<{ highlited: boolean }>`
  transition: box-shadow 0.3s;
  ${(props) =>
    props.highlited ? `box-shadow: -1px 1px 3px -1px rgb(0 0 0 / 70%);` : ""}
`;

type TContainerProps = PaperProps & {
  highlited: boolean;
};

const Container: React.FC<TContainerProps> = ({ children, ...props }) => {
  return <PaperContainer {...props}>{children}</PaperContainer>;
};

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

const BoxStyled = styled(Box)`
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 8px;
`;

type TItemProps = {
  workspaceId: Id;
  item: TItem;
};

const Item: React.FC<TItemProps> = ({ item, workspaceId }) => {
  return (
    <Container
      variant={"outlined"}
      onClick={() =>
        editItem(workspaceId, item.id, { ...item, taken: !item.taken })
      }
      highlited={item.taken}
    >
      <Stack direction={"row"} alignItems="center" spacing={1}>
        <Typography style={{ flexGrow: 1 }}>{item.name}</Typography>
        {item.qty && (
          <BoxStyled>
            <Typography>{item.qty}</Typography>
          </BoxStyled>
        )}
        <TakenIcon taken={item.taken}>
          <ShoppingCart />
        </TakenIcon>
        <IconButton onClick={() => deleteItem(item.workspace, item.id)}>
          <Remove />
        </IconButton>
      </Stack>
    </Container>
  );
};

export default Item;
