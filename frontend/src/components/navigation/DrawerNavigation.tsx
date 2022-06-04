import { Drawer, Stack } from "@mui/material";
import { useWorkspacesService } from "../../services/workspaces/workspaces-service";
import Loading from "../utils/Loading";
import Workspaces from "../workspaces/sidebar/Workspaces";

type TDrawerNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DrawerNavigation: React.FC<TDrawerNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  const { workspaces, isProcessing } = useWorkspacesService();
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <Stack style={{ minWidth: "100px", padding: "5px 0px" }}>
        {isProcessing ? <Loading /> : <Workspaces workspaces={workspaces} />}
      </Stack>
    </Drawer>
  );
};

export default DrawerNavigation;
