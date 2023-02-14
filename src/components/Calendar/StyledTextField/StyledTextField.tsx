import TextField, { TextFieldProps } from "@mui/material/TextField";

import "./styledTextField.css";

/**
 * this component is for the mui date picker
 * it has a custom css styling to make the calendar icon white
 */
export const StyledTextField = ({ sx = {}, ...rest }: TextFieldProps) => {
  return <TextField {...rest} sx={sx} />;
};
