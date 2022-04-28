import { CircularProgress, Grid, styled } from "@mui/material";

type TLoadingProps = {};

const Loading: React.FC<TLoadingProps> = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100px" }}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default Loading;

export const LoadingIcon = styled(CircularProgress)`
  width: 24px !important;
  height: 24px !important;
`;
