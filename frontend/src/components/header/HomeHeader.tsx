import { Skeleton, Stack, styled, Typography } from "@mui/material";
import Search from "./Search";
import { useSearchForm } from "./searchForm/useSearchForm";

const StackStyled = styled(Stack)`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, -12px);
  max-width: 250px;
`;

type THomeHeaderProps = {
  nickname?: string;
};

const HomeHeader: React.FC<THomeHeaderProps> = ({ nickname }) => {
  const { handleSubmit, control } = useSearchForm();
  return (
    <>
      <StackStyled spacing={0}>
        <Typography color="primary" align="center" fontWeight={600}>
          Welcome back
        </Typography>
        {nickname ? (
          <Typography
            variant="h5"
            align="center"
            fontWeight={800}
            color="primary"
          >
            {nickname}
          </Typography>
        ) : (
          <Skeleton height={32} width={100} />
        )}
      </StackStyled>
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
