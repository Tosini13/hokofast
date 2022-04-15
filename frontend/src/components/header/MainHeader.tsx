import { Stack, Typography } from "@mui/material";
import HeaderLayout from "./HeaderLayout";
import HeaderMenu from "./HeaderMenu";
import Search from "./Search";

type TMainHeaderProps = {};

const MainHeader: React.FC<TMainHeaderProps> = () => {
  return (
    <HeaderLayout>
      <Stack spacing={3}>
        <HeaderMenu />
        <Stack spacing={0}>
          <Typography>Welcome back</Typography>
          <Typography variant="h5" fontWeight={800}>
            Chris4
          </Typography>
        </Stack>
        <Typography align="center">
          Are you ready for super fast shopping?
        </Typography>
      </Stack>
      <Search placeholder={"Find list..."} />
    </HeaderLayout>
  );
};

export default MainHeader;
