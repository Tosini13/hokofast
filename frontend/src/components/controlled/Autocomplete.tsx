import {
  Autocomplete as AutocompleteMui,
  AutocompleteProps,
  AutocompleteValue,
  TextFieldProps,
  Typography,
} from "@mui/material";
import {
  Path,
  PathValue,
  UnpackNestedValue,
  useController,
  UseControllerProps,
} from "react-hook-form";
import TextField, { TTextFieldProps } from "./TextField";

type TAutocompleteProps<
  FormValues,
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "name" | "renderInput"
> &
  UseControllerProps<FormValues> & {
    textFieldProps: TTextFieldProps<FormValues>;
    renderInput?: AutocompleteProps<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >["renderInput"];
  };

const Autocomplete = <
  FormValues extends {},
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
  name,
  control,
  rules,
  textFieldProps,
  ...props
}: TAutocompleteProps<FormValues, T, Multiple, DisableClearable, FreeSolo>) => {
  const {
    field: { ref, value, onChange, ...inputProps },
  } = useController<FormValues>({
    name,
    control,
    rules,
  });
  return (
    <AutocompleteMui
      ref={ref}
      size="small"
      value={
        value as
          | AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
          | undefined
      }
      onChange={(_e, value) => onChange(value)}
      {...inputProps}
      renderInput={(params) => <TextField {...params} {...textFieldProps} />}
      {...props}
    />
  );
};

export default Autocomplete;
