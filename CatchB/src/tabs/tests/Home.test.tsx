import { render } from "@testing-library/react-native";

import Home from "../Home";

jest.mock("expo-font", () => ({
  useFonts: jest.fn().mockReturnValue([true]),
}));
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));
jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock(
  "assets/fonts/KBO_Dia_Gothic_medium.ttf",
  () => "KBO Dia Gothic Medium Font"
);
jest.mock(
  "assets/fonts/KBO_Dia_Gothic_bold.ttf",
  () => "KBO Dia Gothic Bold Font"
);
jest.mock(
  "assets/fonts/KBO_Dia_Gothic_light.ttf",
  () => "KBO Dia Gothic Light Font"
);
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("Home", () => {
  it("renders correctly", () => {
    render(<Home />);
  });

  it("calls SplashScreen.hideAsync() when fonts are loaded", async () => {
    require("expo-font").useFonts = jest.fn().mockReturnValue([true]);

    render(<Home />);
  });

  it("renders null when fonts are not loaded", () => {
    jest.spyOn(require("expo-font"), "useFonts").mockReturnValue([false]);
    render(<Home />);
  });
});
