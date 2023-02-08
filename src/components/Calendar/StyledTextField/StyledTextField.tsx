import TextField, { TextFieldProps } from "@mui/material/TextField";
import { defaultTextColor } from "../../../constants/globalStyles";

import "./styledTextField.css";

export const StyledTextField = ({ sx = {}, ...rest }: TextFieldProps) => {
  const customSx = {
    input: defaultTextColor,
    textarea: defaultTextColor,
    label: defaultTextColor,
    fieldset: { borderColor: "white" },
    "& label.Mui-focused": {
      color: defaultTextColor,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: defaultTextColor,
      },
      "&:hover fieldset": {
        borderColor: defaultTextColor,
      },
    },
    ...sx,
  };
  return <TextField {...rest} sx={customSx} />;
};
