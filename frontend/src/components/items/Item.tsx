import { Remove } from "@mui/icons-material";
import { Box, IconButton, Stack, styled, Typography } from "@mui/material";
import { deleteItem } from "../../services/items/item-service";
import { TItem } from "../../types/items";
import { PaperStyled } from "../lists/Lists";

const BoxStyled = styled(Box)`
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 8px;
`;

type TItemProps = {
  item: TItem;
};

const Item: React.FC<TItemProps> = ({ item }) => {
  return (
    <PaperStyled variant="outlined">
      <Stack direction={"row"} alignItems="center" spacing={1}>
        <Typography style={{ flexGrow: 1 }}>{item.name}</Typography>
        {item.qty && (
          <BoxStyled>
            <Typography>{item.qty}</Typography>
          </BoxStyled>
        )}
        <IconButton onClick={() => deleteItem(item.list, item.id)}>
          <Remove />
        </IconButton>
      </Stack>
    </PaperStyled>
  );
};

export default Item;
