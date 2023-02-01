import { screen } from "@testing-library/react";
import { render } from "../../../utils/testing.utils";
import { SpecificDay } from "./SpecificDay";

describe("SpecificDay", () => {
  it("renders dummy text", () => {
    render(<SpecificDay />);
    expect(screen.getByText("Specific Day")).toBeInTheDocument();
  });
});
