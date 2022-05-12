import {
  CircularProgress,
  CircularProgressProps,
  Grid,
  styled,
} from "@mui/material";

type LoadingProps = CircularProgressProps & {
  customColor?: string;
};

const Loading: React.FC<LoadingProps> = ({ customColor, ...props }) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100px" }}
    >
      <Grid item>
        <CircularProgress {...props} style={{ color: customColor }} />
      </Grid>
    </Grid>
  );
};

export default Loading;

export const LoadingIcon = styled(CircularProgress)<{ customColor?: string }>`
  width: 24px !important;
  height: 24px !important;
  ${(props) => (props.customColor ? `color: ${props.customColor}` : "")}
`;
