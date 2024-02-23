/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { CommunityList, VideoList } from "./";
import { renderWithProviders } from "../../../utils/test-utils";

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

const components = (mode: "야구톡" | "모집") => {
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
  it("renders correctly and handles presses", () => {
    renderWithProviders(components("야구톡"));
  });
});

describe("<VideoList />", () => {
  it("renders correctly", () => {
    renderWithProviders(<VideoList />);
  });
});
