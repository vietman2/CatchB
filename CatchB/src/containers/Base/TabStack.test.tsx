/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, waitFor } from "@testing-library/react-native";
import * as expoLocation from "expo-location";

import TabContainer from "./TabStack";
import { renderWithProviders } from "../../utils/test-utils";
import { admin } from "../../variables/mvp_dummy_data/user";
import * as SecureStore from ".store/storage/secure";
import * as userService from "../../services/user_management/account";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("rn-tourguide", () => ({
  TourGuideZone: "TourGuideZone",
}));
jest.mock("../", () => {
  return {
    CommunityContainer: "CommunityContainer",
    HistoryContainer: "HistoryContainer",
    MyPageContainer: "MyPageContainer",
    MyStoreContainer: "MyStoreContainer",
    NearbyContainer: "NearbyContainer",
    NormalContainer: "NormalContainer",
    ProContainer: "ProContainer",
    PromotionContainer: "PromotionContainer",
  };
});
jest.mock("../../components/Dialogs", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    SwitchModeDialog: ({ onClose, setMode }: any) => {
      return (
        <>
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={setMode}>
            <Text>OK</Text>
          </TouchableOpacity>
        </>
      );
    },
    LoginDialog: ({ onClose }: { onClose: () => void }) => {
      return (
        <TouchableOpacity onPress={onClose}>
          <Text>닫기</Text>
        </TouchableOpacity>
      );
    },
  };
});

jest.spyOn(SecureStore, "get").mockImplementation((key) => {
  if (key === "refresh_token") {
    return Promise.resolve("refresh");
  }
  if (key === "uuid") {
    return Promise.resolve("uuid");
  } else return Promise.reject(new Error("error"));
});
jest.spyOn(userService, "getUserProfile").mockImplementation(() =>
  Promise.resolve({
    status: 200,
    data: {
      access: "access",
    },
  })
);
jest.spyOn(userService, "renewToken").mockImplementation(() =>
  Promise.resolve({
    status: 200,
    data: {
      access: "access",
    },
  })
);
jest
  .spyOn(expoLocation, "requestForegroundPermissionsAsync")
  .mockImplementation(() => {
    return Promise.resolve({
      status: expoLocation.PermissionStatus.GRANTED,
      expires: "never",
      granted: true,
      canAskAgain: true,
    });
  });
jest
  .spyOn(expoLocation, "getCurrentPositionAsync")
  .mockImplementation(async () => {
    return Promise.resolve({
      coords: {
        latitude: 37.5326,
        longitude: 127.024612,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: 1627663200000,
    });
  });

const Components = () => {
  return (
    <NavigationContainer>
      <TabContainer />
    </NavigationContainer>
  );
};

describe("<TabContainer />", () => {
  it("handles long press: successfully change mode", async () => {
    const { getAllByTestId, getByText } = await waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          general: { mode: "pro", location: null },
          auth: { user: admin, token: "token" },
        },
      })
    );
    const tab = getAllByTestId("MyPageIcon")[0];

    waitFor(() => {
      fireEvent(tab, "onLongPress");
      fireEvent.press(getByText("OK"));
    });
  });

  it("handles long press: change mode fail", async () => {
    const { getAllByTestId } = await waitFor(() =>
      renderWithProviders(<Components />)
    );
    const tab = getAllByTestId("MyPageIcon")[0];

    waitFor(() => {
      fireEvent(tab, "onLongPress");
    });
  });

  it("handles token renewal and auto login", async () => {
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

    waitFor(
      async () => await waitFor(() => renderWithProviders(<Components />))
    );
  });

  it("handles token renewal and auto login fail: no profile", async () => {
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

    const { getByText } = await waitFor(
      async () => await waitFor(() => renderWithProviders(<Components />))
    );

    fireEvent.press(getByText("닫기"));
  });

  it("handles token renewal and auto login fail: token renew fail", async () => {
    jest.spyOn(userService, "renewToken").mockImplementation(async () =>
      Promise.resolve({
        status: 400,
        data: {
          access: "access",
        },
      })
    );

    await waitFor(
      async () => await waitFor(() => renderWithProviders(<Components />))
    );
  });

  it("handles token renewal and auto login fail: no token", async () => {
    jest.spyOn(SecureStore, "get").mockImplementation((key) => {
      if (key === "refresh_token") {
        return Promise.resolve(null);
      }
      if (key === "uuid") {
        return Promise.resolve("uuid");
      } else return Promise.reject(new Error("error"));
    });

    await waitFor(
      async () => await waitFor(() => renderWithProviders(<Components />))
    );
  });

  it("handles token renewal and auto login fail: no uuid", async () => {
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
    jest.spyOn(SecureStore, "get").mockImplementation((key) => {
      if (key === "refresh_token") {
        return Promise.resolve("refresh");
      }
      if (key === "uuid") {
        return Promise.resolve(null);
      } else return Promise.reject(new Error("error"));
    });

    await waitFor(
      async () => await waitFor(() => renderWithProviders(<Components />))
    );
  });

  it("handles permission rejection", async () => {
    jest
      .spyOn(expoLocation, "requestForegroundPermissionsAsync")
      .mockImplementation(() => {
        return Promise.resolve({
          status: expoLocation.PermissionStatus.DENIED,
          expires: "never",
          granted: false,
          canAskAgain: true,
        });
      });

    await waitFor(
      async () => await waitFor(() => renderWithProviders(<Components />))
    );
  });

  it("handles permission rejection: no location", async () => {
    jest
      .spyOn(expoLocation, "getCurrentPositionAsync")
      .mockImplementation(async () => {
        return Promise.resolve(null);
      });

    await waitFor(
      async () => await waitFor(() => renderWithProviders(<Components />))
    );
  });
});
