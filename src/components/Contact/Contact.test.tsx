import { screen } from "@testing-library/react";
import { render } from "../../utils/testing.utils";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("submit button is disabled by default", () => {
    render(<Contact />);
    expect(screen.getByText("Submit")).toBeDisabled();
  });
});
