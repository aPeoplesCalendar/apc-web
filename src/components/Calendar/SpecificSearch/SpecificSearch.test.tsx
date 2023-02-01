import { screen } from "@testing-library/react";
import { render } from "../../../utils/testing.utils";
import { SpecificSearch } from "./SpecificSearch";

describe("SpecificSearch", () => {
  it("renders dummy text", () => {
    render(<SpecificSearch />);
    expect(screen.getByText("Specific Search")).toBeInTheDocument();
  });
});
