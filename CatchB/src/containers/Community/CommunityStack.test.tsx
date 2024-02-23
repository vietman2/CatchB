/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CommunityContainer from "./CommunityStack";
import { renderWithProviders } from "../../utils/test-utils";
import { samplePosts } from "../../variables/mvp_dummy_data/posts";

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
jest.mock("./Main", () => "Main");
jest.mock("./PostCreate", () => "PostCreate");
jest.mock("./PostDetail", () => "PostDetail");
jest.mock("../../components/Buttons", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    BackButton: ({ onPress }: { onPress: () => void }) => {
      return (
        <TouchableOpacity onPress={onPress} testID="back">
          <Text>Back</Text>
        </TouchableOpacity>
      );
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

const components = () => {
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
    const { getByTestId } = renderWithProviders(components(), {
      preloadedState: {
        community: {
          selectedPost: samplePosts[0],
        },
      },
    });

    fireEvent.press(getByTestId("create-post-button"));
    fireEvent.press(getByTestId("back"));
  });
});
