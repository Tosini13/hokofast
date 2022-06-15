import {
  Box,
  Paper,
  PaperProps,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";

const PaperStyled = styled(Paper)`
  cursor: pointer;
  border: none;
  border-radius: 10px;
  padding: 4px 10px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &:focus {
    box-shadow: none;
  }
  @media screen and (min-width: 769px) {
    &:hover {
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
    }
  }
`;

export const ItemTypographyBox = styled(Box)`
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 8px;
`;

const PaperContainer = styled(PaperStyled)<{ highlited?: boolean }>`
  transition: box-shadow 0.3s;
  padding: 7px 15px !important;
  ${(props) =>
    !props.highlited ? `box-shadow: -1px 1px 3px -1px rgb(0 0 0 / 70%);` : ""}
`;

type TItemContainerProps = PaperProps & {
  highlited?: boolean;
};

export const ItemContainer: React.FC<TItemContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <PaperContainer variant={"outlined"} {...props}>
      {children}
    </PaperContainer>
  );
};
export default ItemContainer;

type TItemTypographyProps = TypographyProps;

export const ItemTypography: React.FC<TItemTypographyProps> = (props) => (
  <Typography fontSize={"18px"} {...props} />
);
