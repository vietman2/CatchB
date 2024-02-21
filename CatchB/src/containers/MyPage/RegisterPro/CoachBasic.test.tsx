import axios from "axios";
import { Alert } from "react-native";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as DocumentPicker from "expo-document-picker";

import CoachBasic from "./CoachBasic";
import { renderWithProviders } from "../../../utils/test-utils";
import { admin } from "../../../variables/mvp_dummy_data/user";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  const { Dialog } = jest.requireActual("react-native-paper");

  const mockButton = ({ children, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );

  const mockChip = ({ children, onClose }) => (
    <TouchableOpacity onPress={onClose}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );

  return {
    PaperProvider: Provider,
    Text: "Text",
    TextInput: "TextInput",
    Portal: "Portal",
    Divider: "Divider",
    Button: mockButton,
    Chip: mockChip,
    Dialog,
  };
});
jest.mock("expo-document-picker", () => ({
  getDocumentAsync: jest.fn(),
}));
jest.mock("../../../components/Checkboxes/SingleCheck", () => "SingleCheck");
jest.mock("../../../components/Checkboxes/MultiCheck", () => "MultiCheck");

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
  it("should handle area choose", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {
          sido: [{ code: "11", name: "서울특별시" }],
          sigungu: [
            { code: "1100000000", name: "서울특별시 관악구" },
            { code: "1100000001", name: "서울특별시 강남구" },
          ],
          sigungu_by_sido: {
            서울특별시: ["관악구", "강남구"],
          },
        },
      })
    );

    const { getByText } = render();

    await waitFor(() => {
      fireEvent.press(getByText("선택하기"));
      fireEvent.press(getByText("관악구"));
      fireEvent.press(getByText("확인"));
    });
  });

  it("should handle upload", async () => {
    jest.spyOn(DocumentPicker, "getDocumentAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: false,
        assets: null,
        output: null,
      })
    );

    const { getByText } = render();

    await waitFor(() => {
      fireEvent.press(getByText("업로드"));
    });
  });

  it("should handle register success: navigate to MyPageScreen", async () => {
    jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
    const { getByText } = render();

    await waitFor(() => {
      fireEvent.press(getByText("등록하기"));
    });

    const alert = Alert.alert.mock.calls[0][2];

    waitFor(() => {
      alert[0].onPress();
      alert[1].onPress();
    });
  });
});
