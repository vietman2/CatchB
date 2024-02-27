import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PostCreate from "./PostCreate";
import { renderWithProviders } from "../../../utils/test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  return {
    PaperProvider: Provider,
    Icon: "Icon",
    Text: "Text",
    TextInput: {
      ...jest.requireActual("react-native-paper").TextInput,
      Affix: "Affix",
    },
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");

const Stack = createStackNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PostCreate" component={PostCreate} />
        <Stack.Screen name="PostDetail" component={PostCreate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<PostCreate />", () => {
  it("renders correctly and handles forum select", () => {
    const { getByTestId, getByText } = renderWithProviders(<Components />);

    fireEvent.press(getByTestId("forum-picker"));
    fireEvent.press(getByText("모집"));
    fireEvent.press(getByTestId("forum-picker"));
    fireEvent.press(getByTestId("selected-forum"));
  });

  it("handles tag picker open", async () => {
    const { getByTestId } = renderWithProviders(<Components />);

    waitFor(() => fireEvent.press(getByTestId("tag-picker")));
  });

  it("handles create post", () => {
    const { getByText } = renderWithProviders(<Components />);

    waitFor(() => fireEvent.press(getByText("등록")));
  });
});
