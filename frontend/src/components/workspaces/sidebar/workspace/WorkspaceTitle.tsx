import { Typography } from "@mui/material";

type TWorkspaceTitleProps = {};

const WorkspaceTitle: React.FC<TWorkspaceTitleProps> = ({ children }) => {
  return (
    <Typography textAlign={"center"} fontSize={11}>
      {children}
    </Typography>
  );
};

export default WorkspaceTitle;
