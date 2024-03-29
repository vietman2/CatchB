/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { BaseballCommunity, RecruitmentCommunity, MarketCommunity } from "./";
import { sampleSimplePosts, sampleTags } from ".data/community";
import * as APIServer from ".services/community/post";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  return {
    ...jest.requireActual("react-native-paper"),
    Chip: "Chip",
    Divider: "Divider",
    Icon: "Icon",
    Text: "Text",
    TextInput: {
      ...jest.requireActual("react-native").TextInput,
      Icon: "Icon",
    },
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../fragments", () => ({
  PostSimple: "PostSimple",
}));
jest.mock(".components/Error", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    ErrorPage: ({ onRefresh }: { onRefresh: () => void }) => (
      <TouchableOpacity onPress={onRefresh}>
        <Text>Error</Text>
      </TouchableOpacity>
    ),
  };
});
jest.mock(".components/Loading", () => ({
  LoadingPage: "LoadingPage",
}));
jest.mock(".components/ScrollView", () => ({
  ScrollView: "ScrollView",
}));

const Stack = createStackNavigator();

const FakePage = () => {
  return <></>;
};

const Components = ({ mode }: { mode: "덕아웃" | "드래프트" | "장터" }) => {
  const Component = () => {
    if (mode === "덕아웃") {
      return <BaseballCommunity />;
    } else if (mode === "드래프트") {
      return <RecruitmentCommunity />;
    } else {
      return <MarketCommunity />;
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CommunityList" component={Component} />
        <Stack.Screen name="PostDetail" component={FakePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

jest.spyOn(APIServer, "getPostList").mockResolvedValue({
  status: 200,
  data: { posts: sampleSimplePosts, tags: sampleTags },
});

describe("<CommunityList />", () => {
  it("renders community mode correctly, and handles navigate to <PostDetail />", async () => {
    const { getByTestId, getByText } = await waitFor(() =>
      renderWithProviders(<Components mode="덕아웃" />)
    );

    fireEvent.press(getByTestId("sort-button"));
    fireEvent.press(getByText("최신순"));
    fireEvent.press(getByText("인기순"));
    fireEvent.press(getByText("인기순"));
    fireEvent.press(getByText("닫기"));
    waitFor(() => fireEvent.press(getByTestId("post-id-1")));
  });

  it("renders recruit mode correctly", () => {
    waitFor(() => renderWithProviders(<Components mode="드래프트" />));
  });

  it("renders market mode correctly", () => {
    waitFor(() => renderWithProviders(<Components mode="장터" />));
  });

  it("renders handles error and refresh correctly", async () => {
    jest.spyOn(APIServer, "getPostList").mockResolvedValue({
      status: 400,
      data: {},
    });
    const { getByText } = await waitFor(() =>
      renderWithProviders(<Components mode="드래프트" />)
    );

    fireEvent.press(getByText("Error"));
  });
});
