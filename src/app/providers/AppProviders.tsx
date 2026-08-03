import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

type Props = {
  children: ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return <StoreProvider>{children}</StoreProvider>;
};
