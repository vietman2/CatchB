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
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Text: "Text",
    FAB: ({ label, onPress }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{label}</Text>
      </TouchableOpacity>
    ),
    TextInput: {
      ...jest.requireActual("react-native-paper").TextInput,
      Icon: "Icon",
    },
    Chip: "Chip",
    Divider: "Divider",
    Icon: "Icon",
  };
});
jest.mock("@gorhom/bottom-sheet", () => {
  const { View, Text, TouchableOpacity } = jest.requireActual("react-native");

  return {
    __esModule: true,
    default: "BottomSheet",
    BottomSheetBackdrop: ({ children, props }: any) => <View>{children}<TouchableOpacity onPress={props.onPress}><Text>닫기</Text></TouchableOpacity></View>,
    BottomSheetBackdropProps: "BottomSheetBackdropProps",
  };
});

const Stack = createStackNavigator();

const components = () => {
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
    const { getAllByText } = renderWithProviders(components());

    waitFor(() => {
      fireEvent.press(getAllByText("모집")[0]);
      fireEvent.press(getAllByText("야구톡")[0]);
      fireEvent.press(getAllByText("벼룩시장")[0]);
      fireEvent.press(getAllByText("자세 분석")[0]);
      fireEvent.press(getAllByText("내 활동")[0]);
    });
  });

  it("handles sort correctly", async () => {
    const { getByText } = renderWithProviders(components());

    await waitFor(() => {
      fireEvent.press(getByText("최신순"));
      fireEvent.press(getByText("인기순"));
      fireEvent.press(getByText("조회 많은 순"));
      fireEvent.press(getByText("댓글 많은 순"));
      fireEvent.press(getByText("닫기"));
    });
  });
});
