import { Skeleton, Stack, Typography } from "@mui/material";

type TWorkspaceHeaderProps = {
  workspaceName?: string;
};

const WorkspaceHeader: React.FC<TWorkspaceHeaderProps> = ({
  workspaceName,
}) => {
  return (
    <Stack spacing={0}>
      {workspaceName ? (
        <Typography
          variant="h5"
          fontWeight={800}
          color="primary"
          align="center"
        >
          {workspaceName}
        </Typography>
      ) : (
        <Skeleton height={32} width={100} />
      )}
    </Stack>
  );
};

export default WorkspaceHeader;
