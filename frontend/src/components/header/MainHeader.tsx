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
          <Typography color="primary" fontWeight={600}>
            Welcome back
          </Typography>
          <Typography variant="h5" fontWeight={800} color="primary">
            Chris4
          </Typography>
        </Stack>
        <Typography color="primary" align="center" fontWeight={600}>
          Are you ready for super fast shopping?
        </Typography>
      </Stack>
      <Search placeholder={"Find list..."} />
    </HeaderLayout>
  );
};

export default MainHeader;
