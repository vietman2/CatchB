import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, waitFor } from "@testing-library/react-native";

import TabContainer from "./TabStack";
import { renderWithProviders } from "../utils/test-utils";
import { admin } from "../variables/mvp_dummy_data/user";
import * as SecureStore from "../store/secure";
import * as userService from "../services/account";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("./Home/HomeStack", () => "HomeStack");
jest.mock("./Nearby/Nearby", () => "Nearby");
jest.mock("./Community/CommunityStack", () => "CommunityStack");
jest.mock("./Calendar/CalendarStack", () => "CalendarStack");
jest.mock("./MyPage/MyPageStack", () => "MyPageStack");
jest.mock("./MyStore/MyStoreStack", () => "MyStoreStack");

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <TabContainer />
    </NavigationContainer>
  );
}

describe("<TabContainer />", () => {
  it("renders all tabs with correct properties", () => {
    render();
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
    const { getAllByTestId, getByText } = render();
    const tab = getAllByTestId("MyPageIcon")[0];

    waitFor(() => {
      fireEvent(tab, "onLongPress");
    });

    const button = getByText("확인");

    fireEvent.press(button);
  });

  it("handles token renewal and auto login", async () => {
    jest.spyOn(SecureStore, "get").mockImplementation((key) => {
      if (key === "refresh_token") {
        return Promise.resolve("refresh");
      }
      if (key === "uuid") {
        return Promise.resolve("uuid");
      } else return Promise.reject();
    });
    jest.spyOn(userService, "renewToken").mockImplementation(async () =>
      Promise.resolve({
        status: 200,
        data: {
          access: "access",
        },
      })
    );
    jest.spyOn(userService, "getUserProfile").mockImplementation(async () =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );

    waitFor(() => render());
  });

  it("handles token renewal and auto login: fail", async () => {
    jest.spyOn(SecureStore, "get").mockImplementation((key) => {
      if (key === "refresh_token") {
        return Promise.resolve("refresh");
      }
      if (key === "uuid") {
        return Promise.resolve("uuid");
      } else return Promise.reject();
    });
    jest.spyOn(userService, "renewToken").mockImplementation(async () =>
      Promise.resolve({
        status: 200,
        data: {
          access: "access",
        },
      })
    );
    jest.spyOn(userService, "getUserProfile").mockImplementation(async () =>
      Promise.resolve({
        status: 400,
        data: {},
      })
    );

    waitFor(() => render());
  });

  it("handles token renewal and auto login: fail2", async () => {
    jest.spyOn(SecureStore, "get").mockImplementation((key) => {
      if (key === "refresh_token") {
        return Promise.resolve("refresh");
      }
      if (key === "uuid") {
        return Promise.resolve("uuid");
      } else return Promise.reject();
    });
    jest.spyOn(userService, "renewToken").mockImplementation(async () =>
      Promise.resolve({
        status: 400,
        data: {
          access: "access",
        },
      })
    );

    waitFor(() => render());
  });
});
