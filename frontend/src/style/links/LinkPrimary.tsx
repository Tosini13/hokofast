import { styled, Theme, useTheme } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

const LinkStyled = styled(Link)<{ theme: Theme }>`
  color: ${(props) => props.theme.palette.primary.main};
  text-decoration: none;
  text-align: center;
  font-weight: 800;
  text-transform: uppercase;
`;

type TLinkPrimaryProps = LinkProps;

const LinkPrimary: React.FC<TLinkPrimaryProps> = (props) => {
  const theme = useTheme();
  return (
    <LinkStyled theme={theme} {...props}>
      {props.children}
    </LinkStyled>
  );
};

export default LinkPrimary;
