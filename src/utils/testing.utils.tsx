import { render as pureRender, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { MemoryRouter } from "react-router";

export const render = (
  component: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => pureRender(<MemoryRouter>{component}</MemoryRouter>, options);
