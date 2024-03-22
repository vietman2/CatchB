/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert } from "react-native";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CoachBasic from "./CoachBasic";
import { sampleCoaches } from ".data/products";
import { admin } from ".data/users";
import * as CoachAPI from ".services/products/coach";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Text: "Text",
    Divider: "Divider",
    Button: ({ children, onPress }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
  };
});
jest.mock("expo-document-picker", () => ({
  DocumentPickerAsset: "DocumentPickerAsset",
}));
jest.mock("expo-image-picker", () => ({
  ImagePickerAsset: "ImagePickerAsset",
}));
jest.mock("../fragments", () => ({
  MainTitle: "MainTitle",
  SubTitle: "SubTitle",
  DisabledTextInput: "DisabledTextInput",
}));
jest.mock(".components/Loading", () => ({
  LoadingComponent: "LoadingComponent",
}));
jest.mock(".components/Pickers", () => ({
  FilePicker: "FilePicker",
}));
jest.mock(".components/Selectors", () => ({
  Selector: "Selector",
}));
jest.mock(".components/Terms", () => ({
  RegisterProTerms: "RegisterProTerms",
}));

const Stack = createStackNavigator();
const Component = () => <CoachBasic onFinish={jest.fn()} />;

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="RegisterPro" component={Component} />
        <Stack.Screen name="MyPageScreen" component={Component} />
      </Stack.Navigator>
    </NavigationContainer>,
    {
      preloadedState: {
        auth: {
          user: admin,
          token: "token",
        },
      },
    }
  );
};

describe("<CoachBasic />", () => {
  it("should handle register success: navigate to MyPageScreen", async () => {
    jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
    jest.spyOn(CoachAPI, "postCoach").mockResolvedValue({
      status: 201,
      data: sampleCoaches[0],
    });
    const { getByText } = render();

    await waitFor(() => {
      fireEvent.press(getByText("등록하기"));
    });
  });
});
