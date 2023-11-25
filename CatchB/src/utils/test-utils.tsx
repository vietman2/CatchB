import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";
import { PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react-native";

import { RootState, AppStore } from "../store/store";
import { setupStore } from "../store/slices/index";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function AllProviders({ children }: PropsWithChildren): JSX.Element {
    return (
      <Provider store={store}>
        <PaperProvider>{children}
        </PaperProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: AllProviders, ...renderOptions })};
}
