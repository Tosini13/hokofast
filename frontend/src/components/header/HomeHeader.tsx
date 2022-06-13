import { Skeleton, Stack, styled, Typography } from "@mui/material";
import { Id } from "../../types/utils";
import HomeHeaderForm from "./homeHeader/HomeHeaderForm";

const StackStyled = styled(Stack)`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, -12px);
  max-width: 250px;
`;

type THomeHeaderProps = {
  nickname?: string;
  setCategory: (category: Id | undefined | null) => void;
};

const HomeHeader: React.FC<THomeHeaderProps> = ({ nickname, setCategory }) => {
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
      <HomeHeaderForm setCategory={setCategory} />
    </>
  );
};

export default HomeHeader;
