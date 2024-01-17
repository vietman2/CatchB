import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";

import SwitchModeDialog from "./SwitchModeDialog";
import LoginDialog from "./LoginDialog";
import AreaPicker from "./AreaPicker";
import { renderWithProviders } from "../../utils/test-utils";
import { admin, exampleUser } from "../../variables/mvp_dummy_data/user";

jest.mock("react-native-paper", () => {
  return {
    ...jest.requireActual("react-native-paper"),
    Chip: "Chip"
  };
});

describe("<SwitchModeDialog />", () => {
  it("renders basic mode correctly, and handles button press", () => {
    const { getByText } = renderWithProviders(
      <SwitchModeDialog
        visible={true}
        currentMode="basic"
        user={null}
        onClose={() => {}}
        setMode={() => {}}
      />,
      {
        preloadedState: { mode: { mode: "basic" } },
      }
    );

    fireEvent.press(getByText("확인"));
  });

  it("renders pro mode correctly", () => {
    const { getByText } = renderWithProviders(
      <SwitchModeDialog
        visible={true}
        currentMode="pro"
        user={null}
        onClose={() => {}}
        setMode={() => {}}
      />,
      {
        preloadedState: { mode: { mode: "pro" } },
      }
    );

    fireEvent.press(getByText("확인"));
  });

  it("renders basic mode correctly with admin", () => {
    const { getByText } = renderWithProviders(
      <SwitchModeDialog
        visible={true}
        currentMode="basic"
        user={admin}
        onClose={() => {}}
        setMode={() => {}}
      />,
      {
        preloadedState: { mode: { mode: "basic" } },
      }
    );

    fireEvent.press(getByText("확인"));
  });

  it("renders basic mode correctly with normal user", () => {
    const { getByText } = renderWithProviders(
      <SwitchModeDialog
        visible={true}
        currentMode="basic"
        user={exampleUser}
        onClose={() => {}}
        setMode={() => {}}
      />,
      {
        preloadedState: { mode: { mode: "basic" } },
      }
    );

    fireEvent.press(getByText("확인"));
  });
});

describe("<LoginDialog />", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(
      <LoginDialog
        visible={true}
        title="title"
        contents="contents"
        onClose={() => {}}
      />
    );

    fireEvent.press(getByText("확인"));
  });
});

describe("<AreaPicker />", () => {
  jest.spyOn(axios, "get").mockImplementation(() =>
    Promise.resolve({
      status: 200,
      data: {
        sido: [
          { code: "11", name: "서울특별시" },
          { code: "26", name: "부산광역시" },
          { code: "01", name: "세종특별자치시" },
        ],
        sigungu: [
          { code: "1100000000", name: "서울특별시 관악구" },
          { code: "2600000000", name: "부산광역시 연제구" },
          { code: "0100000000", name: "세종특별자치시" },
        ],
        sigungu_by_sido: {
          서울특별시: ["관악구"],
          부산광역시: ["연제구"],
          세종특별자치시: ["세종특별자치시"],
        },
      },
    })
  );
  it("renders and handles onPresses correctly", async () => {
    const { getByText, getAllByText } = await waitFor(() =>
      renderWithProviders(<AreaPicker visible={true} onDismiss={() => {}} />)
    );

    await waitFor(() => {
      fireEvent.press(getByText("부산광역시"));
      fireEvent.press(getByText("연제구"));
      fireEvent.press(getByText("연제구"));
      fireEvent.press(getAllByText("세종특별자치시")[0]);
      fireEvent.press(getAllByText("세종특별자치시")[1]);
    });
  });
});
