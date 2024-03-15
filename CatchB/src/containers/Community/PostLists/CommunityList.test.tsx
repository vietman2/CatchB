/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { BaseballCommunity, RecruitmentCommunity } from "./";
import { renderWithProviders } from "../../../utils/test-utils";
import * as APIServer from "../../../services/community/post";
import { sampleSimplePosts } from ".data/community";

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

const Stack = createStackNavigator();

const FakePage = () => {
  return <></>;
};

const Components = ({ mode }: { mode: "덕아웃" | "드래프트" }) => {
  const Component = () => {
    if (mode === "덕아웃") {
      return <BaseballCommunity />;
    } else {
      return <RecruitmentCommunity />;
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
  data: sampleSimplePosts,
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
  });

  it("renders recruit mode correctly", () => {
    waitFor(() => renderWithProviders(<Components mode="드래프트" />));
  });
});
