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
jest.mock(".components/Pickers", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  const mockedFile = {
    uri: "uri",
    name: "name",
    type: "type",
  };

  return {
    FilePicker: ({ setUploadedFile }) => (
      <TouchableOpacity onPress={() => setUploadedFile(mockedFile)}>
        <Text>Upload</Text>
      </TouchableOpacity>
    ),
  };
});
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
    jest.spyOn(CoachAPI, "postCoach").mockResolvedValue({
      status: 201,
      data: sampleCoaches[0],
    });
    jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
    const { getByText } = render();

    await waitFor(() => {
      fireEvent.press(getByText("Upload"));
      fireEvent.press(getByText("등록하기"));
    });

    const alert = Alert.alert.mock.calls[0][2];

    waitFor(() => {
      alert[0].onPress();
      alert[1].onPress();
    });
  });

  it("should handle register failure: no file uploaded", async () => {
    const { getByText } = render();

    await waitFor(() => {
      fireEvent.press(getByText("등록하기"));
    });
  });

  it("should handle register failure: API error", async () => {
    jest.spyOn(CoachAPI, "postCoach").mockResolvedValue({
      status: 400,
      data: { message: "error" },
    });
    const { getByText } = render();

    await waitFor(() => {
      fireEvent.press(getByText("Upload"));
      fireEvent.press(getByText("등록하기"));
    });
  });

  it("should handle file upload", async () => {
    const { getByText } = render();

    await waitFor(() => {
      fireEvent.press(getByText("pdf 업로드"));
      fireEvent.press(getByText("이미지 업로드"));
    });
  });
});
