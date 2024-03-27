import { fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PostReport from "./PostReport";
import { samplePosts } from ".data/community";
import { admin } from ".data/users";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Text: "Text",
    TextInput: "TextInput",
  };
});
jest.mock("expo-image-picker", () => ({
  ImagePickerAsset: "ImagePickerAsset",
}));
jest.mock("../fragments", () => ({
  InputText: "InputText",
  PostHeader: "PostHeader",
}));
jest.mock(".components/Pickers", () => ({
  ImagePicker: "ImagePicker",
}));
jest.mock(".components/Selectors", () => ({
  Selector: "Selector",
}));

const Stack = createStackNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PostReport"
          component={PostReport}
          initialParams={{
            post: samplePosts[0],
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<PostReport />", () => {
  it("should handle report", () => {
    const { getByText } = renderWithProviders(<Components />, {
      preloadedState: {
        auth: {
          token: "token",
          user: admin,
        },
      },
    });

    fireEvent.press(getByText("신고하기"));
  });
});
