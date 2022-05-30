import { Skeleton, Stack, Typography } from "@mui/material";
import { useGetCurrentUser } from "../../models/api/getCurrentUser";
import HeaderLayout from "./HeaderLayout";
import HeaderMenu from "./HeaderMenu";
import Search from "./Search";
import { useSearchForm } from "./searchForm/useSearchForm";

type TMainHeaderProps = {};

const MainHeader: React.FC<TMainHeaderProps> = () => {
  const { response } = useGetCurrentUser();
  const { handleSubmit, control } = useSearchForm();

  return (
    <HeaderLayout>
      <Stack spacing={3}>
        <HeaderMenu />
        <Stack spacing={0}>
          <Typography color="primary" fontWeight={600}>
            Welcome back
          </Typography>
          {response ? (
            <Typography variant="h5" fontWeight={800} color="primary">
              {response.data.nickname}
            </Typography>
          ) : (
            <Skeleton height={32} width={100} />
          )}
        </Stack>
        <Typography color="primary" align="center" fontWeight={600}>
          Are you ready for super fast shopping?
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Search
          name={"search"}
          control={control}
          placeholder={"Find list..."}
        />
      </form>
    </HeaderLayout>
  );
};

export default MainHeader;
