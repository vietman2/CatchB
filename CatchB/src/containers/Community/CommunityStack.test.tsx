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
    Avatar: {
      ...jest.requireActual("react-native-paper").Avatar,
      Icon: "Icon",
    },
  };
});
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

  it("navigates to <PostDetail />", async () => {
    waitFor(async () => {
      const { getByText, getByTestId } = renderWithProviders(components(), {
        preloadedState: {
          community: {
            selectedPost: samplePosts[0],
          },
        },
      });

      await waitFor(() => fireEvent.press(getByText("KBO 개막 D-200")));
      fireEvent.press(getByTestId("back"));
    });
  });
});
