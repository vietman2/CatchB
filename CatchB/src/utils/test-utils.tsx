import { ReactElement } from "react";
import { render } from "@testing-library/react-native";

const AllTheProviders = ({ children }: any) => {
  return children;
};

const customRender = (ui: ReactElement, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
