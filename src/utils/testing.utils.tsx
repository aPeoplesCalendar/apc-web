import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render as pureRender,
  RenderOptions as PureRenderOptions,
} from "@testing-library/react";
import { ReactElement } from "react";
import { MemoryRouter, useLocation } from "react-router";

const queryClient = new QueryClient();

export type RenderOptions = PureRenderOptions & { initialEntries: string[] };

export const render = (
  component: ReactElement,
  options?: Omit<RenderOptions, "queries">
) =>
  pureRender(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={options?.initialEntries}>
        {component}
      </MemoryRouter>
    </QueryClientProvider>,
    options
  );

export const LocationPathnameDisplay = () => {
  const { pathname } = useLocation();
  return <div>{pathname}</div>;
};
