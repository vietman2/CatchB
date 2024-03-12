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
    Divider: "Divider",
    Icon: "Icon",
    Snackbar: "Snackbar",
    Text: "Text",
    TextInput: {
      ...jest.requireActual("react-native-paper").TextInput,
      Affix: "Affix",
      Icon: "Icon",
    },
  };
});
jest.mock("expo-image-picker", () => ({
  MediaTypeOptions: "MediaTypeOptions",
  launchImageLibraryAsync: jest.fn(),
}));
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../fragments", () => ({
  Tag: "Tag",
  Preview: "Preview",
}));
jest.mock("../../../components/Selectors", () => ({
  Selector: "Selector",
}));

const Stack = createStackNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PostCreate" component={PostCreate} />
        <Stack.Screen name="CommunityScreen" component={PostCreate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<PostCreate />", () => {
  it("handles create post", () => {
    const { getByText } = renderWithProviders(<Components />);

    waitFor(() => fireEvent.press(getByText("등록")));
  });
});
