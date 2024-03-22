/* eslint-disable react/display-name */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterPro from "./RegisterPro";
import { admin } from ".data/users";
import * as CoachAPI from ".services/products/coach";
import * as FacilityAPI from ".services/products/facility";
import { renderWithProviders } from ".utils/test-utils";

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
jest.mock("./Account/Account", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");

  return ({ onFinish }: { onFinish: () => void }) => {
    return <TouchableOpacity onPress={onFinish} testID="account-button" />;
  };
});
jest.mock("./Prices/Prices", () => "Prices");
jest.mock("./Detail/CoachDetail", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");

  return ({ onFinish }: { onFinish: () => void }) => {
    return <TouchableOpacity onPress={onFinish} testID="coach-detail-button" />;
  };
});
jest.mock("./Basic/CoachBasic", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");

  return ({ onFinish }: { onFinish: () => void }) => {
    return <TouchableOpacity onPress={onFinish} testID="coach-basic-button" />;
  };
});
jest.mock("./Basic/FacilityBasic", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");

  return ({ onFinish }: { onFinish: () => void }) => {
    return (
      <TouchableOpacity onPress={onFinish} testID="facility-basic-button" />
    );
  };
});
jest.mock("./Detail/FacilityDetail", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");

  return ({ onFinish }: { onFinish: () => void }) => {
    return (
      <TouchableOpacity onPress={onFinish} testID="facility-detail-button" />
    );
  };
});
jest.mock(".components/Progress", () => ({
  ProgressSteps: "ProgressSteps",
}));

const Stack = createStackNavigator();

const render = (type: "coach" | "facility") => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RegisterPro"
          component={RegisterPro}
          initialParams={{
            title: "title",
            type: type,
          }}
        />
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

describe("<RegisterPro />", () => {
  it("should render coach and handle steps", async () => {
    jest.spyOn(CoachAPI, "getCoachRegisterStatus").mockResolvedValue({
      status: 200,
      data: {
        title: "title",
        message: "message",
        step: 0,
        coach: "1",
      },
    });
    const { getByTestId } = await waitFor(() => render("coach"));

    fireEvent.press(getByTestId("coach-basic-button"));
    fireEvent.press(getByTestId("coach-detail-button"));
    fireEvent.press(getByTestId("account-button"));
  });

  it("should render facility and handle steps", async () => {
    jest.spyOn(FacilityAPI, "getFacilityRegisterStatus").mockResolvedValue({
      status: 200,
      data: {
        title: "title",
        message: "message",
        step: 0,
        facility: "1",
      },
    });
    const { getByTestId } = await waitFor(() => render("facility"));

    fireEvent.press(getByTestId("facility-basic-button"));
    fireEvent.press(getByTestId("facility-detail-button"));
    fireEvent.press(getByTestId("account-button"));
  });
});
