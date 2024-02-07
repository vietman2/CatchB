import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";

import SwitchModeDialog from "./SwitchModeDialog";
import LoginDialog from "./LoginDialog";
import AreaPicker from "./AreaPicker";
import { renderWithProviders } from "../../utils/test-utils";
import { admin, exampleUser } from "../../variables/mvp_dummy_data/user";

jest.mock("react-native-paper", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  const mockChip = ({ children, onClose }) => (
    <TouchableOpacity onPress={onClose}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );

  return {
    ...jest.requireActual("react-native-paper"),
    Chip: mockChip,
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
        preloadedState: { general: { mode: "basic", location: null } },
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
        preloadedState: { general: { mode: "pro", location: null } },
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
        preloadedState: { general: { mode: "basic", location: null } },
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
        preloadedState: { general: { mode: "basic", location: null } },
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
          { code: "1100000001", name: "서울특별시 강남구" },
          { code: "1100000002", name: "서울특별시 송파구" },
          { code: "1100000003", name: "서울특별시 구로구" },
          { code: "1100000004", name: "서울특별시 종로구" },
          { code: "1100000005", name: "서울특별시 강동구" },
          { code: "2600000000", name: "부산광역시 연제구" },
          { code: "0100000000", name: "세종특별자치시" },
        ],
        sigungu_by_sido: {
          서울특별시: [
            "관악구",
            "강남구",
            "송파구",
            "구로구",
            "종로구",
            "강동구",
          ],
          부산광역시: ["연제구"],
          세종특별자치시: ["세종특별자치시"],
        },
      },
    })
  );

  it("renders and handles onPresses correctly", async () => {
    const { getByText, getAllByText } = await waitFor(() =>
      renderWithProviders(
        <AreaPicker
          visible={true}
          onDismiss={() => {}}
          setSelectedAreas={() => {}}
        />
      )
    );

    await waitFor(() => {
      fireEvent.press(getByText("부산광역시"));
      fireEvent.press(getByText("연제구"));
      fireEvent.press(getByText("연제구"));
      fireEvent.press(getAllByText("세종특별자치시")[0]);
      fireEvent.press(getAllByText("세종특별자치시")[1]);
    });
  });

  it("handles over 5 presses correctly", async () => {
    const { getByText } = await waitFor(() =>
      renderWithProviders(
        <AreaPicker
          visible={true}
          onDismiss={() => {}}
          setSelectedAreas={() => {}}
        />
      )
    );

    await waitFor(() => {
      fireEvent.press(getByText("관악구"));
      fireEvent.press(getByText("송파구"));
      fireEvent.press(getByText("구로구"));
      fireEvent.press(getByText("강남구"));
      fireEvent.press(getByText("종로구"));
      fireEvent.press(getByText("강동구"));
    });
  });

  it("handles chip close correctly", async () => {
    const { getByText } = await waitFor(() =>
      renderWithProviders(
        <AreaPicker
          visible={true}
          onDismiss={() => {}}
          setSelectedAreas={() => {}}
        />
      )
    );

    await waitFor(() => {
      fireEvent.press(getByText("관악구"));
    });

    await waitFor(() => {
      fireEvent.press(getByText("서울특별시 관악구"));
    });
  });
});
