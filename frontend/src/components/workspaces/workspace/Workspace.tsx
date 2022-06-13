import { useItemsService } from "../../../services/items/item-service";
import { TWorkspace } from "../../../types/workspaces";
import ItemsList from "../../items/ItemsList";
import Loading from "../../utils/Loading";

type TWorkspaceProps = {
  workspace: TWorkspace;
};

const Workspace: React.FC<TWorkspaceProps> = ({ workspace }) => {
  const items = useItemsService({ workspaceId: workspace.id });
  return <>{items ? <ItemsList items={items} /> : <Loading />}</>;
};

export default Workspace;
