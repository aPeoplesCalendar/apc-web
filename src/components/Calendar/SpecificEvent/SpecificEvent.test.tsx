import { screen } from "@testing-library/react";
import { render } from "../../../utils/testing.utils";
import { SpecificEvent } from "./SpecificEvent";

describe("SpecificEvent", () => {
  it("renders dummy text", () => {
    render(<SpecificEvent />);
    expect(screen.getByText("Specific Event")).toBeInTheDocument();
  });
});
