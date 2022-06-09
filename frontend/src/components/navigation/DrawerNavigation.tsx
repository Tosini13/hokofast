import { Drawer, Stack } from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useWorkspacesService } from "../../services/workspaces/workspaces-service";
import { AuthStoreContext } from "../../stores/authStore";
import { Id } from "../../types/utils";
import Loading from "../utils/Loading";
import DeleteWorkspace from "../workspaces/sidebar/delete/DeleteWorkspace";
import Workspaces from "../workspaces/sidebar/Workspaces";

type TDrawerNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DrawerNavigation: React.FC<TDrawerNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  const { pathname } = useLocation();
  const authStore = useContext(AuthStoreContext);
  const params = useParams<{ workspaceId?: Id }>();
  const { workspaces, isProcessing } = useWorkspacesService();

  const workspace = useMemo(
    () =>
      workspaces.find((workspace) =>
        params.workspaceId
          ? workspace.id === params.workspaceId
          : workspace.author === authStore.userId
      ),
    [params.workspaceId, workspaces, authStore.userId]
  );

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <Stack style={{ minHeight: "100%" }}>
        <Stack style={{ minWidth: "100px", padding: "5px 0px", flexGrow: 1 }}>
          {isProcessing ? (
            <Loading />
          ) : (
            <Workspaces
              workspaces={workspaces}
              activeWorkspaceId={workspace?.id}
            />
          )}
        </Stack>
        {workspace && workspaces.length > 1 && (
          <Stack style={{ padding: "5px 0px" }}>
            <DeleteWorkspace
              workspaceId={workspace.id}
              workspaceName={workspace.name}
            />
          </Stack>
        )}
      </Stack>
    </Drawer>
  );
};

export default DrawerNavigation;
