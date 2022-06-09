import { Skeleton, Stack, Typography } from "@mui/material";
import Search from "./Search";
import { useSearchForm } from "./searchForm/useSearchForm";

type THomeHeaderProps = {
  nickname?: string;
};

const HomeHeader: React.FC<THomeHeaderProps> = ({ nickname }) => {
  const { handleSubmit, control } = useSearchForm();
  return (
    <>
      <Stack spacing={0}>
        <Typography color="primary" fontWeight={600}>
          Welcome back
        </Typography>
        {nickname ? (
          <Typography variant="h5" fontWeight={800} color="primary">
            {nickname}
          </Typography>
        ) : (
          <Skeleton height={32} width={100} />
        )}
      </Stack>
      <Typography color="primary" align="center" fontWeight={600}>
        Are you ready for super fast shopping?
      </Typography>
      <form onSubmit={handleSubmit}>
        <Search
          name={"search"}
          control={control}
          placeholder={"Find list..."}
        />
      </form>
    </>
  );
};

export default HomeHeader;
