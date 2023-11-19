import { ReactNode } from "react";
import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabContainer from "../TabStack";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("@react-navigation/stack", () => {
  return {
    createStackNavigator: () => ({
      Navigator: ({ children }: { children: ReactNode }) => <>{children}</>,
      Screen: () => null,
    }),
  };
});
jest.mock("expo-font", () => "expo-font");
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
}));

describe("TabContainer", () => {
  it("renders all tabs with correct properties", () => {
    const { getByText } = render(
      <NavigationContainer>
        <TabContainer />
      </NavigationContainer>
    );

    expect(getByText("홈")).toBeTruthy();
    expect(getByText("내 주변")).toBeTruthy();
    expect(getByText("함께하기")).toBeTruthy();
    expect(getByText("캘린더")).toBeTruthy();
    expect(getByText("마이페이지")).toBeTruthy();
  });
});
