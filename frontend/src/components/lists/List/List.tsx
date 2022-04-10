import { Add } from "@mui/icons-material";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createItem,
  useItemsService,
} from "../../../services/items/item-service";
import { Id } from "../../../types/utils";
import Item from "../../items/Item";
import ItemForm from "../../items/ItemForm";

const DialogStyled = styled(Dialog)`
  .MuiPaper-root {
    padding: 10px;
  }
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
  const [isOpen, setIsOpen] = useState(false);
  const items = useItemsService(listId);

  const handleSubmit = useCallback(
    (name: string) => {
      createItem(listId, { name });
    },
    [listId]
  );

  console.log("isOpen", isOpen);

  return (
    <>
      <Typography>List</Typography>
      <Stack spacing={1} style={{ margin: "0px 20px" }}>
        {items?.map((item) => (
          <Item key={item.id} item={item} />
        ))}
        <Stack direction={"row"} alignItems="center" justifyContent={"center"}>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <Add />
          </IconButton>
        </Stack>
      </Stack>
      <DialogStyled open={isOpen} onClose={() => setIsOpen(false)}>
        <ItemForm handleSubmit={handleSubmit} />
      </DialogStyled>
    </>
  );
};

const ListPage = withId(List);

export default ListPage;
