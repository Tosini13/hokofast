import { Stack } from "@mui/material";
import HeaderLayout from "./HeaderLayout";
import HeaderMenu from "./HeaderMenu";

type TMainHeaderProps = {
  content?: React.ReactNode;
};

const MainHeader: React.FC<TMainHeaderProps> = ({ content }) => {
  return (
    <HeaderLayout>
      <Stack spacing={3}>
        <HeaderMenu />
        {content}
      </Stack>
    </HeaderLayout>
  );
};

export default MainHeader;
