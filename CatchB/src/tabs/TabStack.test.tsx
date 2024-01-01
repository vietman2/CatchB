import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, waitFor } from "@testing-library/react-native";

import TabContainer from "./TabStack";
import { renderWithProviders } from "../utils/test-utils";
import { admin } from "../variables/mvp_dummy_data/user";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("./Home/HomeStack", () => "HomeStack");
jest.mock("./Nearby/Nearby", () => "Nearby");
jest.mock("./Community/CommunityStack", () => "CommunityStack");
jest.mock("./Calendar/CalendarStack", () => "CalendarStack");
jest.mock("./MyPage/MyPageStack", () => "MyPageStack");
jest.mock("./MyStore/MyStoreStack", () => "MyStoreStack");

describe("<TabContainer />", () => {
  it("renders all tabs with correct properties", () => {
    renderWithProviders(
      <NavigationContainer>
        <TabContainer />
      </NavigationContainer>
    );
  });

  it("handles long press: successfully change mode", () => {
    const { getAllByTestId, getByText } = renderWithProviders(
      <NavigationContainer>
        <TabContainer />
      </NavigationContainer>,
      {
        preloadedState: {
          mode: { mode: "pro" },
          auth: { user: admin, token: "token" },
        },
      }
    );
    const tab = getAllByTestId("MyPageIcon")[0];

    waitFor(() => {
      fireEvent(tab, "onLongPress");
    });

    const button = getByText("확인");

    fireEvent.press(button);
  });

  it("handles long press: change mode fail", () => {
    const { getAllByTestId, getByText } = renderWithProviders(
      <NavigationContainer>
        <TabContainer />
      </NavigationContainer>);
    const tab = getAllByTestId("MyPageIcon")[0];

    waitFor(() => {
      fireEvent(tab, "onLongPress");
    });

    const button = getByText("확인");

    fireEvent.press(button);
  });

  it("handles token renewal and auto login", async () => {
    jest.mock("../services/account", () => ({
      renewToken: jest
        .fn()
        .mockResolvedValue({ status: 200, data: { access: "access" } }),
      getUserProfile: jest.fn().mockResolvedValue({ status: 200, data: {} }),
    }));
    jest.mock("../store/secure", () => ({
      get: jest.fn().mockReturnValue("refresh_token"),
    }));

    renderWithProviders(
      <NavigationContainer>
        <TabContainer />
      </NavigationContainer>
    );
  });
});
