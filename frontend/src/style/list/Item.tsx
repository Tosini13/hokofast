import {
  Box,
  PaperProps,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { PaperStyled } from "../../components/lists/Lists";

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
