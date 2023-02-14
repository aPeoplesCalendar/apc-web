import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import * as styles from "./Contact.styles";

export const Contact = () => {
  const [contactFormData, setContactFormData] = useState({
    title: "",
    message: "",
    email: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
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
          <Typography>Return Email</Typography>
          <TextField
            type="text"
            placeholder="Your Email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <Typography className="inputLabel">Title</Typography>
          <TextField
            type="text"
            placeholder="Subject"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
          <Typography className="inputLabel">Message</Typography>
          <TextField
            name="message"
            placeholder="Your message here..."
            value={message}
            onChange={handleChange}
            multiline
            required
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
