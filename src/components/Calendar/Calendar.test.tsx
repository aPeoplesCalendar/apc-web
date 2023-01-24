import { render, screen } from "@testing-library/react";
import { Calendar } from "./Calendar";

describe("Calendar", () => {
  it("renders dummy text", () => {
    render(<Calendar />);
    expect(screen.getByText("Calendar")).toBeInTheDocument();
  });
});