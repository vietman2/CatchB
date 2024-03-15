/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CommunityContainer from "./CommunityStack";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Text: "Text",
    Icon: "Icon",
  };
});
jest.mock("./Main", () => {
  // mock default
  const { View, Text, TouchableOpacity } = jest.requireActual("react-native");

  return () => {
    const navigation = jest
      .requireActual("@react-navigation/native")
      .useNavigation();
    return (
      <View>
        <Text>CommunityMain</Text>
        <TouchableOpacity
          testID="post-detail-button"
          onPress={() => navigation.navigate("PostDetail")}
        >
          <Text>Details</Text>
        </TouchableOpacity>
      </View>
    );
  };
});
jest.mock("./PostCreate", () => "PostCreate");
jest.mock("./PostDetail", () => "PostDetail");
jest.mock("../../components/Buttons", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");
  return {
    BackButton: ({ onPress }: { onPress: () => void }) => {
      return <TouchableOpacity onPress={onPress} testID="back" />;
    },
  };
});
jest.mock("../../components/Logos", () => {
  const { Text } = jest.requireActual("react-native");
  return {
    SmallLogo: () => {
      return <Text>SmallLogo</Text>;
    },
  };
});

const Tab = createBottomTabNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Community" component={CommunityContainer} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

describe("<CommunityStack />", () => {
  it("renders correctly and navigates to <PostCreate /> and back", () => {
    const { getByTestId } = renderWithProviders(<Components />, {
      preloadedState: {
        community: {
          selectedPostId: 0,
        },
      },
    });
    fireEvent.press(getByTestId("create-post-button"));
    fireEvent.press(getByTestId("back"));
  });

  it("renders correctly and navigates to <PostDetail /> and back", () => {
    const { getByTestId } = renderWithProviders(<Components />, {
      preloadedState: {
        community: {
          selectedPostId: 0,
        },
      },
    });
    fireEvent.press(getByTestId("post-detail-button"));
    fireEvent.press(getByTestId("back"));
  });
});
