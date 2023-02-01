import { screen } from "@testing-library/react";
import { render } from "../../utils/testing.utils";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("renders dummy text", () => {
    render(<Contact />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});
