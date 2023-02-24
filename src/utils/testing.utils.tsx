import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render as pureRender,
  RenderOptions as PureRenderOptions,
} from "@testing-library/react";
import { ReactElement } from "react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export type RenderOptions = PureRenderOptions & { initialEntries: string[] };

export const render = (
  component: ReactElement,
  options?: Omit<RenderOptions, "queries">
) =>
  pureRender(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          autoClose={800}
          theme={"dark"}
          hideProgressBar
          closeButton={false}
        />
        <MemoryRouter initialEntries={options?.initialEntries}>
          {component}
        </MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>,
    options
  );

export const LocationPathnameDisplay = () => {
  const { pathname } = useLocation();
  return <div>{pathname}</div>;
};

type CreateMockedSupabaseFnReturnType = {
  contains: jest.Mock;
  eq: jest.Mock;
  gt: jest.Mock;
  lt: jest.Mock;
  order: jest.Mock;
  range: jest.Mock;
  textSearch: jest.Mock;
  data: unknown;
  error: unknown;
  trackedArgs: string[][];
};

export const createMockSupabaseClient = (data = null, error = null) => {
  const generateMockedFilterMethods = (
    trackedArgs = [] as string[][]
  ): CreateMockedSupabaseFnReturnType => {
    const mockFilterMethodFunctionality = (...args: string[]) => {
      trackedArgs.push(args);
      return generateMockedFilterMethods(trackedArgs);
    };
    return {
      // mocked supabase filter methods
      contains: jest.fn(mockFilterMethodFunctionality),
      eq: jest.fn(mockFilterMethodFunctionality),
      gt: jest.fn(mockFilterMethodFunctionality),
      lt: jest.fn(mockFilterMethodFunctionality),
      order: jest.fn(mockFilterMethodFunctionality),
      range: jest.fn(mockFilterMethodFunctionality),
      textSearch: jest.fn(mockFilterMethodFunctionality),
      // mocked filter results
      data,
      error,
      // exposing this to track in our unit tests
      trackedArgs,
    };
  };

  const mockSupabaseQueries = {
    from: () => ({
      select: () => generateMockedFilterMethods(),
    }),
    storage: {
      from: () => ({
        getPublicUrl: () => ({
          data: "publicImgUrl",
        }),
      }),
    },
  };

  return mockSupabaseQueries;
};
