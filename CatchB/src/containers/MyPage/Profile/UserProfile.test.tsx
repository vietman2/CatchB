/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import UserProfile from "./UserProfile";
import * as SecureStore from ".store/storage/secure";
import { renderWithProviders } from "../../../utils/test-utils";
import { admin } from ".data/users";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const Dialog = jest.requireActual("react-native-paper").Dialog;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Dialog: Dialog,
    Portal: "Portal",
    Text: "Text",
  };
});
jest.mock("../../../components/Profile", () => ({
  AvatarImage: "AvatarImage",
}));
jest.mock("../../../components/Buttons", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    TabButton: ({ title, onPress }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    ),
  };
});
jest.mock("../../../components/Dividers", () => ({
  VerticalDivider: "VerticalDivider",
}));

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="EditProfile" component={UserProfile} />
        <Stack.Screen name="MyPageScreen" component={UserProfile} />
        <Stack.Screen name="PasswordChange" component={UserProfile} />
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

describe("<UserProfile />", () => {
  it("renders correctly without user", async () => {
    const { getByText } = renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="EditProfile" component={UserProfile} />
          <Stack.Screen name="MyPageScreen" component={UserProfile} />
          <Stack.Screen name="PasswordChange" component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>,
      {
        preloadedState: {
          auth: {
            user: null,
            token: "",
          },
        },
      }
    );

    waitFor(() => {
      fireEvent.press(getByText("닉네임"));
      fireEvent.press(getByText("이메일"));
      fireEvent.press(getByText("휴대폰 번호"));
      fireEvent.press(getByText("야구 경력"));
      fireEvent.press(getByText("생년월일"));
    });
  });

  it("renders correctly with user", () => {
    const { getByText } = render();

    waitFor(() => {
      fireEvent.press(getByText("닉네임"));
      fireEvent.press(getByText("이메일"));
      fireEvent.press(getByText("휴대폰 번호"));
      fireEvent.press(getByText("야구 경력"));
      fireEvent.press(getByText("생년월일"));
      fireEvent.press(getByText("비밀번호 변경하기"));
      fireEvent.press(getByText("로그아웃"));
    });
  });

  it("handles logout", () => {
    jest.spyOn(axios, "post").mockImplementation(async () => {
      return {
        status: 200,
      };
    });
    jest
      .spyOn(SecureStore, "get")
      .mockImplementation(() => Promise.resolve("refresh"));

    const { getByText } = render();

    waitFor(() => {
      fireEvent.press(getByText("로그아웃"));
    });
  });

  it("handles logout: bad request", () => {
    jest.spyOn(axios, "post").mockImplementation(async () => {
      return {
        status: 400,
      };
    });
    jest
      .spyOn(SecureStore, "get")
      .mockImplementation(() => Promise.resolve("refresh"));

    const { getByText } = render();

    waitFor(() => {
      fireEvent.press(getByText("로그아웃"));
    });
  });

  it("handles logout: no refresh token", () => {
    jest
      .spyOn(SecureStore, "get")
      .mockImplementation(() => Promise.resolve(null));

    const { getByText } = render();

    waitFor(() => {
      fireEvent.press(getByText("로그아웃"));
    });
  });

  it("handles delete account", () => {
    jest.spyOn(axios, "delete").mockImplementationOnce(async () => {
      return {
        status: 200,
      };
    });

    const { getByText } = render();

    waitFor(() => {
      fireEvent.press(getByText("회원탈퇴"));
      fireEvent.press(getByText("확인"));
    });

    jest.spyOn(axios, "delete").mockImplementationOnce(async () => {
      return {
        status: 400,
      };
    });

    waitFor(() => {
      fireEvent.press(getByText("회원탈퇴"));
      fireEvent.press(getByText("확인"));
    });
  });

  it("handles delete account: user cancel", () => {
    const { getByText } = render();

    waitFor(() => {
      fireEvent.press(getByText("회원탈퇴"));
      fireEvent.press(getByText("취소"));
    });
  });
});
