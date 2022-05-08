import { Paper, Stack, styled, Typography } from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toPath } from "../../routing/paths";
import { useListsService } from "../../services/lists/lists-service";

export const PaperStyled = styled(Paper)`
  cursor: pointer;
  border: none;
  border-radius: 10px;
  padding: 4px 10px;
  &:hover {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  }
`;

const StackContainer = styled(Stack)`
  background-color: #f2f2f2;
  flex-grow: 1;
  padding: 5px 20px;
  padding-top: 274px;
  padding-bottom: 65px;
`;

type TListsProps = {};

const Lists: React.FC<TListsProps> = () => {
  const navigate = useNavigate();
  const data = useListsService();
  return (
    <StackContainer spacing={2}>
      {data?.map((list) => (
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
    </StackContainer>
  );
};

export default Lists;
