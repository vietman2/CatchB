import { waitFor, fireEvent, render, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeContainer from "../HomeStack";
import CoachDetail from "../../pages/CoachDetail";
import FacilityDetail from "../../pages/FacilityDetail";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("expo-font", () => ({
  useFonts: jest.fn().mockReturnValue([true, null]),
}));
jest.mock(
  "assets/fonts/KBO_Dia_Gothic_medium.ttf",
  () => "KBO Dia Gothic Medium Mock"
);
jest.mock(
  "assets/fonts/KBO_Dia_Gothic_bold.ttf",
  () => "KBO Dia Gothic Bold Mock"
);
jest.mock(
  "assets/fonts/KBO_Dia_Gothic_light.ttf",
  () => "KBO Dia Gothic Light Mock"
);

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
}));

describe("<HomeContainer />", () => {
  it("renders correctly", () => {
    render(
      <NavigationContainer>
        <HomeContainer />
      </NavigationContainer>
    );
  });

  const Stack = createStackNavigator();

  it("navigates to CoachDetail and checks header options", async () => {
    const component = (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeContainer} />
          <Stack.Screen name="CoachDetail" component={CoachDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const { getByText } = render(component);
    await act(() => {
      fireEvent.press(getByText("이대호 코치"));
    });

  });

  it("navigates to FacilityDetail and checks header options", async () => {
    const component = (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeContainer} />
          <Stack.Screen name="FacilityDetail" component={FacilityDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const { getByText } = render(component);
    await act(() => {
      fireEvent.press(getByText("원스타베이스볼 아카데미"));
    });

  });

});
