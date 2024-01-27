import { fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CommunityContainer from "./CommunityStack";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { Menu } = jest.requireActual("react-native-paper");
  const { Text, TouchableOpacity } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Text: "Text",
    Menu: Menu,
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
    Icon: "Icon",
    IconButton: "IconButton",
    Divider: "Divider",
  };
});
jest.mock("../../components/Logos/TopBar", () => ({
  leftTitle: "leftTitle",
}));
jest.mock("@gorhom/bottom-sheet", () => {
  const { View } = jest.requireActual("react-native");

  return {
    __esModule: true,
    default: "BottomSheet",
    BottomSheetBackdrop: ({ children }: any) => <View>{children}</View>,
    BottomSheetBackdropProps: "BottomSheetBackdropProps"
  };
});

const Tab = createBottomTabNavigator();

describe("<CommunityStack />", () => {
  it("renders correctly and navigates to <PostCreate />", () => {
    const { getByText, getByTestId, debug } = renderWithProviders(
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Community" component={CommunityContainer} />
        </Tab.Navigator>
      </NavigationContainer>
    );

    fireEvent.press(getByText("글 작성"));
    fireEvent.press(getByText("등록"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByText("포스트2 제목"));
  });
});
