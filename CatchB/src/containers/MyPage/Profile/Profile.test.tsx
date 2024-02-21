/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import EditProfile from "./EditProfile";
import UserProfile from "./UserProfile";
import * as SecureStore from "../../../store/secure";
import { renderWithProviders } from "../../../utils/test-utils";
import { admin } from "../../../variables/mvp_dummy_data/user";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("../../../components/Buttons/TabButton", () => {
  const { View, Text } = jest.requireActual("react-native");
  return ({ title, detail, onPress }: any) => {
    return (
      <View testID="tab-button" onPress={onPress}>
        <Text>{title}</Text>
        <Text>{detail}</Text>
      </View>
    );
  };
});

const Stack = createStackNavigator();

const renderEditProfile = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          initialParams={{
            title: "title",
            detail: "detail",
          }}
        />
        <Stack.Screen name="Profile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<EditProfile />", () => {
  it("should handle text input and button press", () => {
    const { getByTestId, getByText } = renderEditProfile();

    const textInput = getByTestId("edit-profile-text-input");
    const button = getByText("확인");

    waitFor(() => {
      fireEvent.press(button);
      fireEvent.changeText(textInput, "new detail");
      fireEvent.press(button);
      fireEvent.changeText(textInput, "");
      fireEvent.press(button);
    });
  });
});

const renderUserProfile = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="EditProfile" component={UserProfile} />
        <Stack.Screen name="MyPageScreen" component={UserProfile} />
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
        </Stack.Navigator>
      </NavigationContainer>, {
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
    const { getByText } = renderUserProfile();

    waitFor(() => {
      fireEvent.press(getByText("닉네임"));
      fireEvent.press(getByText("이메일"));
      fireEvent.press(getByText("휴대폰 번호"));
      fireEvent.press(getByText("야구 경력"));
      fireEvent.press(getByText("생년월일"));
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

    const { getByText } = renderUserProfile();

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

    const { getByText } = renderUserProfile();

    waitFor(() => {
      fireEvent.press(getByText("로그아웃"));
    });
  });

  it("handles logout: no refresh token", () => {
    jest
      .spyOn(SecureStore, "get")
      .mockImplementation(() => Promise.resolve(null));

    const { getByText } = renderUserProfile();

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

    const { getByText } = renderUserProfile();

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
    const { getByText } = renderUserProfile();

    waitFor(() => {
      fireEvent.press(getByText("회원탈퇴"));
      fireEvent.press(getByText("취소"));
    });
  });
});
