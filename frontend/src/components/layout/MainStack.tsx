import { Stack, styled } from "@mui/material";

const StackContainer = styled(Stack)`
  min-height: 100vh;
`;

type TMainStackProps = {};

const MainStack: React.FC<TMainStackProps> = ({ children }) => {
  return <StackContainer>{children}</StackContainer>;
};

export default MainStack;
