import { Box, styled } from "@mui/material";

const BoxStyled = styled(Box)<{ active?: boolean }>`
  margin: 0px 6px;
  border-radius: 10px;
  ${(props) =>
    props.active
      ? `
    background-color: rgba(3,3,3,0.15);
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
