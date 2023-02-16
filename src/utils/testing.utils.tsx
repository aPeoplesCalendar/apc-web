import { render as pureRender, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { MemoryRouter, useLocation } from "react-router";

export const render = (
  component: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => pureRender(<MemoryRouter>{component}</MemoryRouter>, options);

export const LocationPathnameDisplay = () => {
  const { pathname } = useLocation();
  return <div>{pathname}</div>;
};
