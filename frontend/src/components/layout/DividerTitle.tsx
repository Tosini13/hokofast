import {
  Divider,
  Stack,
  styled,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";

const DividerStyled = styled(Divider)<{ color: string }>`
  flex-grow: 1;
  ${(props) =>
    props.color
      ? `background-color: ${props.color};`
      : "background-color: rgba(0,0,0,0.7);"}
`;

const TypographyStyled = styled(Typography)<{ color: string }>`
  ${(props) =>
    props.color ? `color: ${props.color};` : "color: rgba(0,0,0,0.7);"}
`;

type TDividerTitleProps = TypographyProps;

const DividerTitle: React.FC<TDividerTitleProps> = ({
  children,
  textAlign = "center",
  ...props
}) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems="center"
      justifyContent={"center"}
      spacing={2}
    >
      <DividerStyled color={theme.palette.text.secondary} />
      <TypographyStyled
        textAlign={textAlign}
        {...props}
        color={theme.palette.text.secondary}
      >
        {children}
      </TypographyStyled>
      <DividerStyled color={theme.palette.text.secondary} />
    </Stack>
  );
};

export default DividerTitle;
