import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import * as styles from "./Contact.styles";

export const Contact = () => {
  const [contactFormData, setContactFormData] = useState({
    title: "",
    message: "",
    email: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    if (e.target.value.length > 1000) {
      return;
    }
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value,
    });
  };

  const { email, message, title } = contactFormData;
  const disableSubmit = !email || !message || !title;

  return (
    <Box>
      <form name="contact" method="post">
        <input type="hidden" name="form-name" value="contact" />
        <Typography sx={styles.headerStyle} variant="h5">
          Contact
        </Typography>
        <Box sx={styles.formContainer}>
          <TextField
            type="text"
            placeholder="Your Email"
            name="email"
            value={email}
            onChange={handleChange}
            label="Return Email"
            required
          />
          <TextField
            type="text"
            placeholder="Subject"
            name="title"
            value={title}
            onChange={handleChange}
            label="Title"
            required
          />
          <TextField
            name="message"
            placeholder="Your message here..."
            value={message}
            onChange={handleChange}
            multiline
            rows={5}
            required
            label="Message"
          />
        </Box>
        <Box sx={styles.buttonContainer}>
          <Button
            type="submit"
            value="Submit"
            disabled={disableSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};
