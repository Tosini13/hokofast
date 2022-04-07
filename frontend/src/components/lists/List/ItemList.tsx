import { Remove } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { deleteItem } from "../../../services/items/item-service";
import { TItem } from "../../../types/items";

const PaperStyled = styled(Paper)`
  border-radius: 15px;
  padding: 10px;
`;

const BoxStyled = styled(Box)`
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 8px;
`;

type TItemListProps = {
  item: TItem;
};

const ItemList: React.FC<TItemListProps> = ({ item }) => {
  return (
    <PaperStyled>
      <Stack direction={"row"} alignItems="center" spacing={1}>
        <Typography style={{ flexGrow: 1 }}>{item.name}</Typography>
        <BoxStyled>
          <Typography>2kg</Typography>
        </BoxStyled>
        <IconButton onClick={() => deleteItem(item.list, item.id)}>
          <Remove />
        </IconButton>
      </Stack>
    </PaperStyled>
  );
};

export default ItemList;
