import { Stack } from "@mui/material";
import HeaderLayout from "./HeaderLayout";
import HeaderMenu from "./HeaderMenu";

type TListFormHeaderProps = {};

const ListFormHeader: React.FC<TListFormHeaderProps> = () => {
  return (
    <HeaderLayout>
      <Stack spacing={3}>
        <HeaderMenu />
      </Stack>
    </HeaderLayout>
  );
};

export default ListFormHeader;
