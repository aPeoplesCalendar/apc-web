import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../utils/testing.utils";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("submit button is disabled by default", () => {
    render(<Contact />);
    expect(screen.getByText("Submit")).toBeDisabled();
  });
  it("enables submit button after all three fields are filled out", () => {
    render(<Contact />);
    fireEvent.change(screen.getByRole("textbox", { name: "Return Email" }), {
      target: { value: "email" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "title" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Message" }), {
      target: { value: "message" },
    });
    expect(screen.getByText("Submit")).toBeEnabled();
  });
});
