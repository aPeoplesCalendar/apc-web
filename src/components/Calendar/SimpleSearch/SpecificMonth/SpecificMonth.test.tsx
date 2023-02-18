import { screen } from "@testing-library/react";
import { render } from "../../../../utils/testing.utils";
import { SpecificMonth } from "./SpecificMonth";

describe("SpecificMonth", () => {
  const defaultProps = { month: "1" };
  const daysToCheck = ["1/4", "1/31"];
  it.each(daysToCheck)("renders all the days of the month", async (day) => {
    render(<SpecificMonth {...defaultProps} />);
    expect(await screen.findByText(day, { exact: false })).toBeInTheDocument();
  });
});
