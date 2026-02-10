'use client';

import type { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider/AuthProvider";

export function RootProviders({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

