import { render } from "@testing-library/react-native";

import HomeContainer from "../HomeStack";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("@react-navigation/stack", () => {
  return {
    createStackNavigator: () => ({
      Navigator: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      ),
      Screen: () => null,
    }),
  };
});
jest.mock("expo-font", () => "expo-font");
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
}));

describe("<HomeContainer />", () => {
  it("renders correctly", () => {
    render(<HomeContainer />);
  });
});
