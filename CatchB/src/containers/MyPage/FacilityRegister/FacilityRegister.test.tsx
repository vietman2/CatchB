/* eslint-disable react/display-name */
import { fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FacilityRegister from "./FacilityRegister";
import { renderWithProviders } from "../../../utils/test-utils";
import { admin } from "../../../variables/mvp_dummy_data/user";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("./FacilityStep1", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");

  return ({ onFinish }: { onFinish: void }) => {
    return (
      <TouchableOpacity onPress={onFinish}>
        <Text>FacilityStep1</Text>
      </TouchableOpacity>
    );
  };
});
jest.mock("./FacilityStep2", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");

  return ({ onFinish }: { onFinish: void }) => {
    return (
      <TouchableOpacity onPress={onFinish}>
        <Text>FacilityStep2</Text>
      </TouchableOpacity>
    );
  };
});
jest.mock("./FacilityStep3", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");

  return ({ onFinish }: { onFinish: void }) => {
    return (
      <TouchableOpacity onPress={onFinish}>
        <Text>FacilityStep3</Text>
      </TouchableOpacity>
    );
  };
});
jest.mock("./FacilityStep4", () => "FacilityStep4");

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FacilityRegister" component={FacilityRegister} />
      </Stack.Navigator>
    </NavigationContainer>,
    {
      preloadedState: {
        auth: {
          user: admin,
          token: "token",
        },
      },
    }
  );
};

describe("FacilityRegister", () => {
  it("should render and handle steps", () => {
    const { getByText } = render();

    fireEvent.press(getByText("FacilityStep1"));
    fireEvent.press(getByText("FacilityStep2"));
    fireEvent.press(getByText("FacilityStep3"));
  });
});
