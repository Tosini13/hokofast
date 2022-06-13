import { Drawer, Stack } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useWorkspacesService } from "../../services/workspaces/workspaces-service";
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
  const params = useParams<{ workspaceId?: Id }>();
  const { workspaces, isProcessing } = useWorkspacesService();

  const workspace = useMemo(
    () => workspaces.find((workspace) => workspace.id === params?.workspaceId),
    [params.workspaceId, workspaces]
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
