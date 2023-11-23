import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import HomeStack from "../HomeStack";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("expo-font", () => ({
  useFonts: jest.fn().mockReturnValue([true, null]),
}));
jest.mock(
  "assets/fonts/KBO_Dia_Gothic_medium.ttf",
  () => "KBO Dia Gothic Medium Mock"
);
jest.mock(
  "assets/fonts/KBO_Dia_Gothic_bold.ttf",
  () => "KBO Dia Gothic Bold Mock"
);
jest.mock(
  "assets/fonts/KBO_Dia_Gothic_light.ttf",
  () => "KBO Dia Gothic Light Mock"
);
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
}));

describe("<HomeStack />", () => {
  it("renders correctly", () => {
    render(
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    );
  });
});
