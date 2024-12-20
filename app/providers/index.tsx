"use client";

import { store } from "app/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

export interface MainProviderProps extends PropsWithChildren {}

export function MainProvider({ children }: MainProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
