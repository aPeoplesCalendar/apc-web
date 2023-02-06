import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

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
    <div>
      <form name="contact" method="post">
        <input type="hidden" name="form-name" value="contact" />
        <header>
          <Typography>Contact Us</Typography>
        </header>
        <div>
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
        </div>
        <Button
          type="submit"
          value="Submit"
          onClick={() => alert("submitted")}
          disabled={disableSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
