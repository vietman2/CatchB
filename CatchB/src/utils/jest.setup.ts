import mockSafeAreaContext from "react-native-safe-area-context/jest/mock"

jest.mock("../hooks/useFonts", () => jest.fn().mockReturnValue(true));
jest.mock("expo-font", () => ({
  Font: {
    loadAsync: jest.fn(),
  },
}));
jest.mock("assets/fonts/NPSfont_extrabold.ttf", () => "Catch B ExtraBold");
jest.mock("assets/fonts/NPSfont_bold.ttf", () => "Catch B Bold");
jest.mock("assets/fonts/NPSfont_regular.ttf", () => "Catch B Regular");
jest.mock("react-native-vector-icons/MaterialCommunityIcons", () => "Icon");
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("react-native/Libraries/Animated/Easing");
jest.mock("react-native/Libraries/Animated/animations/TimingAnimation");
jest.mock("react-native-gesture-handler", () => ({
  createGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  GestureHandlerRootView: jest.fn(),
}));
jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);
