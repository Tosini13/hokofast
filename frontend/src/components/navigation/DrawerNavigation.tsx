import { Drawer, Stack } from "@mui/material";
import { TWorkspace } from "../../types/workspaces";
import Workspaces from "../workspaces/Workspaces";

/**
 * @todo remove mock
 */
const mockWorkspaces: TWorkspace[] = [
  {
    id: "1",
    name: "my",
    author: "me",
    users: [],
  },
  {
    id: "2",
    name: "home",
    author: "me",
    users: [],
  },
];

type TDrawerNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DrawerNavigation: React.FC<TDrawerNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <Stack style={{ minWidth: "100px", padding: "5px 0px" }}>
        <Workspaces workspaces={mockWorkspaces} />
      </Stack>
    </Drawer>
  );
};

export default DrawerNavigation;
