import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, waitFor } from "@testing-library/react-native";
import * as expoLocation from "expo-location";

import TabContainer from ".";
import { renderWithProviders } from "../../utils/test-utils";
import { admin } from "../../variables/mvp_dummy_data/user";
import * as SecureStore from "../../store/secure";
import * as userService from "../../services/user_management/account";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("rn-tourguide", () => ({
  TourGuideZone: "TourGuideZone",
}));
jest.mock("../Home/HomeStack", () => "HomeStack");
jest.mock("../Nearby/NearbyStack", () => "NearbyStack");
jest.mock("../Community/CommunityStack", () => "CommunityStack");
jest.mock("../History/HistoryStack", () => "HistoryStack");
jest.mock("../MyPage/MyPageStack", () => "MyPageStack");
jest.mock("../MyStore/MyStoreStack", () => "MyStoreStack");
jest.mock("../../components/Dialogs/LoginDialog", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    __esModule: true,
    default: ({ onClose }: { onClose: () => void }) => {
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
jest.spyOn(axios, "get").mockImplementation(() =>
  Promise.resolve({
    status: 200,
    data: {
      access: "access",
    },
  })
);
jest.spyOn(axios, "post").mockImplementation(() =>
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

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <TabContainer />
    </NavigationContainer>
  );
};

describe("<TabContainer />", () => {
  it("handles long press: successfully change mode", async () => {

    const { getAllByTestId, getByText } = await waitFor(() =>
      renderWithProviders(
        <NavigationContainer>
          <TabContainer />
        </NavigationContainer>,
        {
          preloadedState: {
            general: { mode: "pro", location: null },
            auth: { user: admin, token: "token" },
          },
        }
      )
    );
    const tab = getAllByTestId("MyPageIcon")[0];

    waitFor(() => {
      fireEvent(tab, "onLongPress");
    });

    const button = getByText("확인");

    fireEvent.press(button);
  });

  it("handles long press: change mode fail", async () => {
    const { getAllByTestId, getByText } = await waitFor(() => render());
    const tab = getAllByTestId("MyPageIcon")[0];

    waitFor(() => {
      fireEvent(tab, "onLongPress");
    });

    fireEvent.press(getByText("확인"));
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

    await waitFor(() => render());
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

    const { getByText } = await waitFor(() => render());

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

    await waitFor(() => render());
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

    await waitFor(() => render());
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

    await waitFor(() => render());
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

    await waitFor(() => render());
  });

  it("handles permission rejection: no location", async () => {
    jest
      .spyOn(expoLocation, "getCurrentPositionAsync")
      .mockImplementation(async () => {
        return Promise.resolve(null);
      });

    await waitFor(() => render());
  });
});
