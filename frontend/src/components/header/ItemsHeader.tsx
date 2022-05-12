import { Add, Delete } from "@mui/icons-material";
import { IconButton, Stack, styled, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TList } from "../../models/backend";
import { EPath } from "../../routing/paths";
import {
  deleteList,
  useListsService,
} from "../../services/lists/lists-service";
import useAsync from "../../utils/useAsync";
import AddItem from "../items/form/AddItem";
import ListName from "../items/form/ListName";
import { LoadingIcon } from "../utils/Loading";
import HeaderLayout from "./HeaderLayout";
import HeaderMenu from "./HeaderMenu";

const withData = (Component: React.ComponentType<TItemsHeaderProps>) => {
  return (props: Omit<TItemsHeaderProps, "list">) => {
    const { listId } = useParams();
    const { lists } = useListsService();
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
    return <Component {...props} list={list} />;
  };
};

const IconButtonStyled = styled(IconButton)<{ isopen?: boolean }>`
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
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const ItemsHeader: React.FC<TItemsHeaderProps> = ({
  list,
  isOpen,
  setIsOpen,
}) => {
  const navigate = useNavigate();
  const { id } = list;
  const { isProcessing, error, execute } = useAsync();

  const handleDelete = React.useCallback(async () => {
    if (isProcessing) {
      return;
    }
    try {
      await execute(deleteList(id));
      navigate(EPath.home);
    } catch (e) {
      console.error("error:", e);
    }
  }, [id, navigate, execute, isProcessing]);

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
      <IconButtonStyled
        onClick={handleDelete}
        style={{ transform: "translate(-50%, -120%)" }}
      >
        {isProcessing ? <LoadingIcon /> : <Delete />}
      </IconButtonStyled>
      {error && (
        <Typography textAlign={"center"}>
          There was a problem: {error}
        </Typography>
      )}
    </HeaderLayout>
  );
};

const ItemsHeaderWithData = withData(ItemsHeader);

export default ItemsHeaderWithData;
