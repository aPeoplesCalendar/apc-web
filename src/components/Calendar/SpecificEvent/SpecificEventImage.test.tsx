import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../utils/testing.utils";
import {
  ISpecificEventImageProps,
  SpecificEventImage,
} from "./SpecificEventImage";

describe("SpecificEventImage", () => {
  const defaultProps: ISpecificEventImageProps = {
    publicImgURL: "publicImgSrc",
    imgAltText: "imgAltText",
  };
  it("should render loading box while image loads", () => {
    render(<SpecificEventImage {...defaultProps} />);
    expect(screen.getByTestId("imgLoadingBox")).toBeInTheDocument();
  });
  it("should render image alt text as a caption", () => {
    render(<SpecificEventImage {...defaultProps} />);
    expect(screen.getByText("imgAltText")).toBeInTheDocument();
  });
  it("should not attempt to render img caption if alt text doesn't exist", () => {
    render(<SpecificEventImage {...defaultProps} imgAltText={undefined} />);
    expect(screen.queryByTestId("imgAltText")).not.toBeInTheDocument();
  });
  it("should assign alt text to image", () => {
    render(<SpecificEventImage {...defaultProps} />);
    expect(screen.getByAltText("imgAltText")).toBeInTheDocument();
  });
  it("should render null if image url doesn't exist", () => {
    render(<SpecificEventImage {...defaultProps} publicImgURL={undefined} />);
    expect(screen.queryByTestId("imgLoadingBox")).not.toBeInTheDocument();
    expect(screen.queryByTestId("imgAltText")).not.toBeInTheDocument();
  });
  it("remove loading box after image load", async () => {
    render(<SpecificEventImage {...defaultProps} />);
    fireEvent.load(screen.getByAltText("imgAltText"));
    await waitFor(() =>
      expect(screen.queryByTestId("imgLoadingBox")).not.toBeInTheDocument()
    );
  });
});
