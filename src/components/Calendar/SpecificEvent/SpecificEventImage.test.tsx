import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../utils/testing.utils";
import {
  ISpecificEventImageProps,
  SpecificEventImage,
} from "./SpecificEventImage";

describe("SpecificEventImage", () => {
  const defaultProps: ISpecificEventImageProps = {
    publicImgURL: "publicImgSrc",
    hasImage: true,
    imgAltText: "imgAltText",
  };
  it("should render loading box while image loads", () => {
    render(<SpecificEventImage {...defaultProps} />);
    expect(screen.getByTestId("imgLoadingBox")).toBeInTheDocument();
  });
  // skipping until we figure out how to mock img onLoad
  it.skip("should render image alt text as a caption", async () => {
    render(<SpecificEventImage {...defaultProps} />);
    expect(await screen.findByText("imgAltText")).toBeInTheDocument();
  });
  it("should not attempt to render img caption if alt text doesn't exist", () => {
    render(<SpecificEventImage {...defaultProps} imgAltText={undefined} />);
    expect(screen.queryByTestId("imgAltText")).not.toBeInTheDocument();
  });
  it("should assign alt text to image", () => {
    render(<SpecificEventImage {...defaultProps} />);
    expect(screen.getByAltText("imgAltText")).toBeInTheDocument();
  });
  it("should render null if not has image", () => {
    render(<SpecificEventImage {...defaultProps} hasImage={false} />);
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
