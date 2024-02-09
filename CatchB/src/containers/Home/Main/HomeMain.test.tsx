/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeMain from "./HomeMain";
import { renderWithProviders } from "../../../utils/test-utils";
import { admin } from "../../../variables/mvp_dummy_data/user";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { View, TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Text: "Text",
    Icon: "Icon",
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Surface: ({ children }: any) => <View>{children}</View>,
    Chip: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Banner: ({ children }: any) => (
      <View>
        <Text>{children}</Text>
      </View>
    ),
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../../../components/Buttons/SurfaceButton", () => "SurfaceButton");
jest.mock("../../../components/Chips/Chips", () => ({
  NotificationChip: () => "NotificationChip",
}));
jest.mock("../../../components/Cards/SimpleCard", () => "SimpleCard");
jest.mock("../../../components/Cards/CardBox", () => "CardBox");

const Stack = createStackNavigator();

const components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeMain" component={HomeMain} />
      </Stack.Navigator>
    </NavigationContainer>);
};

describe("<NormalHome />", () => {
  it("renders with user", () => {
    renderWithProviders(components(), {
      preloadedState: {
        general: { mode: "basic", location: null },
        auth: { user: admin, token: "" },
      },
    });
  });

  it("renders without user", () => {
    renderWithProviders(components(), {
      preloadedState: {
        general: { mode: "basic", location: null },
        auth: { user: null, token: "" },
      },
    });
  });
});

describe("<ProHome />", () => {
  it("renders correctly", () => {
    renderWithProviders(components(), {
      preloadedState: {
        general: { mode: "pro", location: null },
        auth: { user: admin, token: "" },
      },
    });
  });
});
