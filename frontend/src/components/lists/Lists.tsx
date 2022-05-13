import { Paper, Stack, styled, Typography } from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { TList } from "../../models/backend";
import { toPath } from "../../routing/paths";

export const PaperStyled = styled(Paper)`
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

type TListsProps = {
  lists: TList[];
};

const Lists: React.FC<TListsProps> = ({ lists }) => {
  const navigate = useNavigate();
  return (
    <Stack spacing={2}>
      {lists.map((list) => (
        <PaperStyled
          key={list.id}
          onClick={() => navigate(toPath.list(list.id))}
          variant="outlined"
        >
          <Stack
            direction={"row"}
            justifyContent="space-between"
            padding={"5px"}
          >
            <Typography>{list.name}</Typography>
            <Typography>
              {format(new Date(list.dateTime), "dd.MM.yyyy")}
            </Typography>
          </Stack>
        </PaperStyled>
      ))}
    </Stack>
  );
};

export default Lists;
