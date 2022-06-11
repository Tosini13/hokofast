import ItemContainer, { ItemTypography } from "../../../style/list/Item";
import { TWorkspace } from "../../../types/workspaces";

type TWorkspaceItemProps = {
  workspace: TWorkspace;
};

const WorkspaceItem: React.FC<TWorkspaceItemProps> = ({ workspace }) => {
  return (
    <ItemContainer>
      <ItemTypography align="center">{workspace.name}</ItemTypography>
    </ItemContainer>
  );
};

export default WorkspaceItem;
