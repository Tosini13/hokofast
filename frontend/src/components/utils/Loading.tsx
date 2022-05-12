import {
  CircularProgress,
  CircularProgressProps,
  Grid,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";

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

export const LoadingIconStyled = styled(CircularProgress)<{
  customColor?: string;
}>`
  width: 24px !important;
  height: 24px !important;
  ${(props) => (props.customColor ? `color: ${props.customColor}` : "")}
`;

type TLoadingIconProps = CircularProgressProps & {
  customColor?: string;
  mode?: "dark" | "light";
};

export const LoadingIcon: React.FC<TLoadingIconProps> = ({
  customColor: customColorProp,
  mode,
  ...props
}) => {
  const theme = useTheme();

  const customColor = React.useMemo(() => {
    if (customColorProp) {
      return customColorProp;
    }
    if (mode === "dark") {
      return theme.palette.primary.main;
    }
    if (mode === "light") {
      return theme.palette.primary.contrastText;
    }
  }, [theme, customColorProp, mode]);

  return <LoadingIconStyled {...props} customColor={customColor} />;
};
