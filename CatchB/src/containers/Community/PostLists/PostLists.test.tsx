/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { CommunityList, VideoList } from "./";
import { renderWithProviders } from "../../../utils/test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";

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
jest.mock("../PostSimple", () => "PostSimple");

const Stack = createStackNavigator();

const FakePage = () => {
  return <></>;
};

const Components = ({ mode }: { mode: "야구톡" | "모집" }) => {
  const Component = () => <CommunityList mode={mode} />;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CommunityList" component={Component} />
        <Stack.Screen name="PostDetail" component={FakePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<CommunityList />", () => {
  it("renders community mode correctly, and handles navigate to <PostDetail />", async () => {
    const { getByTestId } = renderWithProviders(<Components mode="야구톡" />);

    waitFor(() => fireEvent.press(getByTestId("post-id-1")));
  });

  it("renders community mode correctly, and handles sort", () => {
    const { getByTestId, getByText } = renderWithProviders(
      <Components mode="야구톡" />
    );

    fireEvent.press(getByTestId("sort-button"));
    fireEvent.press(getByText("최신순"));
    fireEvent.press(getByText("인기순"));
    fireEvent.press(getByText("인기순"));
    fireEvent.press(getByText("닫기"));
  });

  it("renders recruit mode correctly", () => {
    renderWithProviders(<Components mode="모집" />);
  });
});

describe("<VideoList />", () => {
  it("renders correctly", () => {
    renderWithProviders(<VideoList />);
  });
});
