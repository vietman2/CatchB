import { fireEvent } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import EditProfile from "./EditProfile";
import UserProfile from "./UserProfile";
import { renderWithProviders } from "../../utils/test-utils";
import { admin } from "../../variables/mvp_dummy_data/user";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("../../components/Avatar/AvatarImage", () => "AvatarImage");
jest.mock("../../components/Divider/VerticalDivider", () => "VerticalDivider");
jest.mock("../../components/Buttons/TabButton", () => {
  const { View, Text } = require("react-native");
  return ({ title, detail, onPress }) => {
    return (
      <View testID="tab-button" onPress={onPress}>
        <Text>{title}</Text>
        <Text>{detail}</Text>
      </View>
    );
  };
});

const Stack = createStackNavigator();

describe("<EditProfile />", () => {
  it("renders correctly", () => {
    renderWithProviders(
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  });

  it("should handle text input", () => {
    const { getByTestId } = renderWithProviders(
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
          <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const textInput = getByTestId("edit-profile-text-input");

    expect(textInput.props.value).toBe("detail");

    fireEvent.changeText(textInput, "new detail");
  });
});

describe("<UserProfile />", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    fireEvent.press(getByText("닉네임"));
    fireEvent.press(getByText("이메일"));
    fireEvent.press(getByText("휴대폰 번호"));
  });

  it("renders correctly with user", () => {
    const { getByText } = renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="UserProfile" component={UserProfile} />
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

    fireEvent.press(getByText("닉네임"));
    fireEvent.press(getByText("이메일"));
    fireEvent.press(getByText("휴대폰 번호"));
  });
});
