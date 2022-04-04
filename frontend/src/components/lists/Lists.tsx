import { Paper, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { useListsService } from "../../services/lists/lists-service";

type TListsProps = {};

const Lists: React.FC<TListsProps> = () => {
  const data = useListsService();
  return (
    <Stack spacing={2} padding="5px">
      {data?.map((list) => (
        <Paper key={list.id}>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            padding={"5px"}
          >
            <Typography variant="h6">{list.name}</Typography>
            <Typography variant="h6">
              {format(new Date(list.dateTime), "dd.MM.yyyy")}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

export default Lists;
