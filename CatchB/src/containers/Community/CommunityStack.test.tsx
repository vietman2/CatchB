/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";
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
    TextInput: {
      ...jest.requireActual("react-native-paper").TextInput,
      Affix: "Affix",
      Icon: "Icon",
    },
    Chip: "Chip",
    Icon: "Icon",
    IconButton: "IconButton",
    Divider: "Divider",
  };
});
jest.mock("react-native-tab-view", () => {
  const TabView = ({ children }: any) => {
    return <>{children}</>;
  };
  const TabBar = ({ children }: any) => {
    return <>{children}</>;
  };
  return {
    TabView,
    TabBar,
    SceneRendererProps: "SceneRendererProps",
    Route: "Route",
  };
})
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../../components/Logos/TopBar", () => ({
  leftTitle: () => "leftTitle",
}));

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
  it("renders correctly and navigates to <PostCreate />", () => {
    renderWithProviders(components(), {
      preloadedState: {
        community: {
          selectedPost: samplePosts[0],
        }
      },
    });
  });
});
