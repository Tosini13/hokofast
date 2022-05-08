import { Add } from "@mui/icons-material";
import { IconButton, Stack, styled } from "@mui/material";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { TList } from "../../models/backend";
import { useListsService } from "../../services/lists/lists-service";
import AddItem from "../items/form/AddItem";
import ListName from "../items/form/ListName";
import HeaderLayout from "./HeaderLayout";
import HeaderMenu from "./HeaderMenu";

const withData = (Component: React.ComponentType<TItemsHeaderProps>) => {
  return () => {
    const { listId } = useParams();
    const lists = useListsService();
    const list = useMemo(
      () => lists?.find((l) => l.id === listId),
      [listId, lists]
    );
    if (!listId || !list) {
      return (
        <HeaderLayout>
          <div style={{ height: "103.88px" }} />
        </HeaderLayout>
      );
    }
    return <Component list={list} />;
  };
};

const IconButtonStyled = styled(IconButton)<{ isopen: boolean }>`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transition: all 0.3s;
  ${(props) =>
    props.isopen
      ? "transform: translateX(-50%) rotate(45deg);"
      : "transform: translateX(-50%);"}
`;

type TItemsHeaderProps = {
  list: TList;
};

const ItemsHeader: React.FC<TItemsHeaderProps> = ({ list }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HeaderLayout>
      <Stack spacing={3}>
        <HeaderMenu />
        <ListName listId={list?.id} name={list?.name} isActive={isOpen} />
        {isOpen ? <AddItem listId={list.id} /> : null}
      </Stack>
      <IconButtonStyled onClick={() => setIsOpen(!isOpen)} isopen={isOpen}>
        <Add />
      </IconButtonStyled>
    </HeaderLayout>
  );
};

const ItemsHeaderWithData = withData(ItemsHeader);

export default ItemsHeaderWithData;
