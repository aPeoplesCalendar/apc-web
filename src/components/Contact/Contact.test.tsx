import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("renders dummy text", () => {
    render(<Contact />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});
