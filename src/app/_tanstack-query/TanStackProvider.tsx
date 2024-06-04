"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

interface TanStackProviderProps {
  children: React.ReactNode;
}

export function TanStackProvider({ children }: TanStackProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
