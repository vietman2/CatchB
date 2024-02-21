/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeMain from ".";
import { renderWithProviders } from "../../../utils/test-utils";
import { admin } from "../../../variables/mvp_dummy_data/user";
import { fireEvent, waitFor } from "@testing-library/react-native";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { View, TouchableOpacity, Text } = jest.requireActual("react-native");

  const MockTitle = (props: any) => (
    <View testID="CardTitle">
      <Text>{props.title}</Text>
      {props.left && <View testID="icon">{props.left()}</View>}
      {props.right && <View testID="icon">{props.right()}</View>}
    </View>
  );

  const MockContent = (props: any) => (
    <View testID="CardContent">{props.children}</View>
  );

  const MockCard = (props: any) => (
    <View testID="Card" {...props}>
      {props.children}
    </View>
  );

  MockCard.Title = MockTitle;
  MockCard.Content = MockContent;

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
    Card: MockCard,
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");

const Stack = createStackNavigator();

const components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeMain" component={HomeMain} />
        <Stack.Screen name="Nearby" component={HomeMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<NormalHome />", () => {
  it("renders with user, and handles filterchip press", () => {
    const { getByText } = renderWithProviders(components(), {
      preloadedState: {
        general: { mode: "basic", location: null },
        auth: { user: admin, token: "" },
      },
    });

    waitFor(() => {
      fireEvent.press(getByText("타격"));
      fireEvent.press(getByText("투구"));
    });
  });

  it("renders without user, and handles navigation", () => {
    const { getByText } = renderWithProviders(components(), {
      preloadedState: {
        general: { mode: "basic", location: null },
        auth: { user: null, token: "" },
      },
    });

    waitFor(() => {
      fireEvent.press(getByText("아카데미 예약"));
      fireEvent.press(getByText("레슨"));
    });
  });
});

describe("<ProHome />", () => {
  it("renders correctly and handles hide", async () => {
    const { getByTestId } = renderWithProviders(components(), {
      preloadedState: {
        general: { mode: "pro", location: null },
        auth: { user: admin, token: "" },
      },
    });

    await waitFor(() => fireEvent.press(getByTestId("hide-press")));
  });
});
