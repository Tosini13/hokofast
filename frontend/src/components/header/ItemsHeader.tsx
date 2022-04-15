import { Add } from "@mui/icons-material";
import { IconButton, Stack, styled } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddItem from "../items/form/AddItem";
import ListName from "../items/form/ListName";
import HeaderLayout from "./HeaderLayout";
import HeaderMenu from "./HeaderMenu";

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

type TItemsHeaderProps = {};

const ItemsHeader: React.FC<TItemsHeaderProps> = () => {
  const { listId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HeaderLayout>
      <Stack spacing={3}>
        <HeaderMenu />
        <ListName name={""} isActive={isOpen} />
        {isOpen && listId ? <AddItem listId={listId} /> : null}
      </Stack>
      <IconButtonStyled onClick={() => setIsOpen(!isOpen)} isopen={isOpen}>
        <Add />
      </IconButtonStyled>
    </HeaderLayout>
  );
};

export default ItemsHeader;
