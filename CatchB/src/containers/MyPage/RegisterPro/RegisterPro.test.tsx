/* eslint-disable react/display-name */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterPro from "./RegisterPro";
import { admin } from ".data/users";
import * as CoachAPI from ".services/products/coach";
import * as FacilityAPI from ".services/products/facility";
import { renderWithProviders } from ".utils/test-utils";
import { Alert } from "react-native";

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
jest.mock("./Info/CoachInfo", () => {
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
jest.mock("./Info/FacilityInfo", () => {
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

const EmptyComponent = () => <></>;

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
        <Stack.Screen name="MyPageScreen" component={EmptyComponent} />
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
  it("should render coach and handle step 0", async () => {
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

  it("should render coach and handle step 1", async () => {
    jest.spyOn(CoachAPI, "getCoachRegisterStatus").mockResolvedValue({
      status: 200,
      data: {
        title: "title",
        message: "message",
        step: 1,
        coach: "1",
      },
    });
    await waitFor(() => render("coach"));
  });

  it("should render coach and handle step -1", async () => {
    jest.spyOn(CoachAPI, "getCoachRegisterStatus").mockResolvedValue({
      status: 200,
      data: {
        title: "title",
        message: "message",
        step: -1,
        coach: "1",
      },
    });
    await waitFor(() => render("coach"));
  });

  it("should handle error", async () => {
    jest.spyOn(CoachAPI, "getCoachRegisterStatus").mockResolvedValue({
      status: 400,
      data: {
        title: "title",
        message: "message",
      },
    });
    await waitFor(() => render("coach"));
  });

  it("should handle server error", async () => {
    jest.spyOn(CoachAPI, "getCoachRegisterStatus").mockResolvedValue({
      status: 500,
      data: {},
    });
    await waitFor(() => render("coach"));
  });

  it("should render facility and handle step 0", async () => {
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

  it("should render facility and handle step 1", async () => {
    jest.spyOn(FacilityAPI, "getFacilityRegisterStatus").mockResolvedValue({
      status: 200,
      data: {
        title: "title",
        message: "message",
        step: 1,
        facility: "1",
      },
    });
    await waitFor(() => render("facility"));
  });

  it("should handle error", async () => {
    jest.spyOn(FacilityAPI, "getFacilityRegisterStatus").mockResolvedValue({
      status: 400,
      data: {
        title: "title",
        message: "message",
      },
    });
    jest.spyOn(Alert, "alert").mockImplementationOnce(jest.fn);
    await waitFor(() => render("facility"));

    waitFor(() => Alert.alert.mock.calls[0][2][0].onPress());
  });

  it("should handle server error", async () => {
    jest.spyOn(FacilityAPI, "getFacilityRegisterStatus").mockResolvedValue({
      status: 500,
      data: {},
    });
    await waitFor(() => render("facility"));
  });
});
