import { render, screen } from "@testing-library/react";
import { SpecificEvent } from "./SpecificEvent";

describe("SpecificEvent", () => {
  it("renders dummy text", () => {
    render(<SpecificEvent />);
    expect(screen.getByText("SpecificEvent")).toBeInTheDocument();
  });
});
