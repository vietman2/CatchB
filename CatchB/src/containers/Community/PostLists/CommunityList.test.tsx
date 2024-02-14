/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CommunityList from "./CommunityList";
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
jest.mock("../PostDetail/PostSimple", () => "PostSimple");

const Stack = createStackNavigator();

const FakePage = () => {
  return <></>;
};

const components = (mode: "야구톡" | "모집") => {
  return (
    <NavigationContainer>
      <CommunityList mode={mode} />
      <Stack.Navigator>
        <Stack.Screen name="PostDetail" component={FakePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<CommunityList />", () => {
  it("renders correctly and handles presses", () => {
    const { getAllByTestId, getByTestId } = renderWithProviders(
      components("야구톡")
    );

    fireEvent.press(getAllByTestId("sortChoice")[0]);
    waitFor(() => fireEvent.press(getByTestId("KBO 개막 D-200")));
  });

  it("renders recruit mode correctly, and handles filters", () => {
    const { getAllByTestId, getByTestId } = renderWithProviders(
      components("모집")
    );

    fireEvent.press(getAllByTestId("sortChoice")[0]);
    fireEvent.press(getByTestId("filters"));
    fireEvent.press(getByTestId("close"));
  });
});
