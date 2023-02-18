import React from "react";
import Typography from "@mui/material/Typography";

type TProps = { children: React.ReactNode };

export class ErrorBoundary extends React.Component<
  TProps,
  { hasError: boolean }
> {
  constructor(props: TProps) {
    super(props);
    this.state = { hasError: false } as { hasError: boolean };
  }

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Typography variant="h5" sx={{ marginTop: "15px", marginLeft: "15px" }}>
          An error occurred. Please try again, or, if the error persists, wait a
          little bit.
        </Typography>
      );
    }

    return this.props.children;
  }
}
