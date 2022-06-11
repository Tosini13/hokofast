import { Add } from "@mui/icons-material";
import { IconButton, Skeleton, Stack, styled, Typography } from "@mui/material";
import { useState } from "react";
import { TWorkspace } from "../../types/workspaces";
import AddItem from "../items/form/AddItem";
import ItemForm from "../items/form/ItemForm";

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

type TWorkspaceHeaderProps = {
  workspace?: TWorkspace;
};

const WorkspaceHeader: React.FC<TWorkspaceHeaderProps> = ({ workspace }) => {
  const [isFormOpen, setOpenForm] = useState(false);
  return (
    <>
      <Stack spacing={0}>
        {workspace ? (
          <Typography
            variant="h5"
            fontWeight={800}
            color="primary"
            align="center"
          >
            {workspace.name}
          </Typography>
        ) : (
          <Skeleton height={32} width={100} />
        )}
      </Stack>
      {workspace && isFormOpen ? <ItemForm workspace={workspace} /> : null}
      {workspace && (
        <IconButtonStyled
          onClick={() => setOpenForm(!isFormOpen)}
          isopen={isFormOpen}
        >
          <Add />
        </IconButtonStyled>
      )}
    </>
  );
};

export default WorkspaceHeader;
