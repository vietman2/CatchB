/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CommunityMain from "./CommunityMain";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Text: "Text",
  };
});
jest.mock("./", () => ({
  PlaceholderComponent: "PlaceholderComponent",
  BaseballCommunity: "BaseballCommunity",
  RecruitmentCommunity: "RecruitmentCommunity",
}));
jest.mock("../PostLists", () => ({
  VideoList: "VideoList",
}));

const Stack = createStackNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CommunityScreen" component={CommunityMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<CommunityMain />", () => {
  it("handles tabs correctly", () => {
    const { getAllByText } = renderWithProviders(<Components />);

    waitFor(() => {
      fireEvent.press(getAllByText("모집")[0]);
      fireEvent.press(getAllByText("야구톡")[0]);
      fireEvent.press(getAllByText("벼룩시장")[0]);
      fireEvent.press(getAllByText("자세분석")[0]);
      fireEvent.press(getAllByText("내 활동")[0]);
    });
  });
});
