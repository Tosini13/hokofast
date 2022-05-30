import { Box, styled } from "@mui/material";

const BoxStyled = styled(Box)<{ active?: boolean }>`
  ${(props) =>
    props.active
      ? `
    background-color: rgba(0,0,0,0.2);
    `
      : ""}
`;

type TWorkspaceContainerProps = {
  isActive?: boolean;
};

const WorkspaceContainer: React.FC<TWorkspaceContainerProps> = ({
  children,
  isActive,
}) => {
  return (
    <BoxStyled paddingTop={1} paddingBottom={1} active={isActive}>
      {children}
    </BoxStyled>
  );
};

export default WorkspaceContainer;
