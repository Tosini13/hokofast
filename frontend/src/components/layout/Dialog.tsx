import {
  Button,
  ButtonProps,
  Dialog as DialogMui,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  styled,
} from "@mui/material";
import React, { useMemo } from "react";

const DialogStyled = styled(DialogMui)`
  .MuiPaper-root {
    padding: 5px 15px;
    border-radius: 20px;
    width: calc(100% - 64px);
  }
`;

const DialogTitleStyled = styled(DialogTitle)`
  border-bottom: solid 1px rgba(0, 0, 0, 0.3);
  font-size: 18px;
  text-align: center;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
  height: 100%;
`;

export const DialogButton: React.FC<ButtonProps> = (props) => (
  <ButtonStyled variant="text" {...props} />
);

type TDialogProps = {
  open: boolean;
  title: string;
  onClose?: () => void;
  dialogActions: React.ReactNode[];
};

const Dialog: React.FC<TDialogProps> = ({
  dialogActions,
  title,
  open,
  onClose,
}) => {
  const actions = useMemo(() => {
    const childrenQty = dialogActions.length;
    return React.Children.map(dialogActions, (child, i) => {
      return (
        <>
          {i === 0 ? null : (
            <Grid xs={0.25}>
              <Stack alignItems={"center"}>
                <Divider
                  style={{
                    height: "50px",
                    width: "1px",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                  }}
                />
              </Stack>
            </Grid>
          )}
          <Grid xs={12 / childrenQty - 0.25} style={{ alignSelf: "stretch" }}>
            {child}
          </Grid>
        </>
      );
    });
  }, [dialogActions]);

  return (
    <DialogStyled open={open} onClose={onClose}>
      <DialogTitleStyled>{title}</DialogTitleStyled>
      <Grid
        container
        alignItems="center"
        justifyContent={"center"}
        style={{ width: "100%" }}
      >
        {actions}
      </Grid>
    </DialogStyled>
  );
};

export default Dialog;
