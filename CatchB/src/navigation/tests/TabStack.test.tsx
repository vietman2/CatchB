import { render } from "../../utils/test-utils";
import TabContainer from "../TabStack";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("@react-navigation/bottom-tabs", () => {
  return {
    createBottomTabNavigator: () => ({
      Navigator: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      ),
      Screen: () => null,
    }),
  };
});
jest.mock("@react-navigation/stack", () => ({
  createStackNavigator: jest.fn(),
}));
jest.mock("expo-font", () => "expo-font");
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
}));

describe("<TabContainer />", () => {
  it("renders correctly", () => {
    render(<TabContainer />);
  });
});
