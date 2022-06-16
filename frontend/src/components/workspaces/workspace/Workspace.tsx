import { Typography } from "@mui/material";
import { useItemsService } from "../../../services/items/items-service";
import { TWorkspace } from "../../../types/workspaces";
import ItemsList from "../../items/ItemsList";
import Loading from "../../utils/Loading";

type TWorkspaceProps = {
  workspace: TWorkspace;
};

const Workspace: React.FC<TWorkspaceProps> = ({ workspace }) => {
  const { items, isProcessing } = useItemsService(workspace.id);
  return (
    <>
      {isProcessing ? (
        <Loading />
      ) : items ? (
        <ItemsList items={items} />
      ) : (
        <Typography>No Items</Typography>
      )}
    </>
  );
};

export default Workspace;
