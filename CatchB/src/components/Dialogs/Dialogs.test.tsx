import { fireEvent } from "@testing-library/react-native";

import SwitchModeDialog from "./SwitchModeDialog";
import LoginDialog from "./LoginDialog";
import { renderWithProviders } from "../../utils/test-utils";
import { admin, exampleUser } from "../../variables/mvp_dummy_data/user";

describe("<SwitchModeDialog />", () => {
  it("renders basic mode correctly, and handles button press", () => {
    const { getByText } = renderWithProviders(
      <SwitchModeDialog
        visible={true}
        currentMode="basic"
        user={null}
        onClose={() => {}}
        setMode={() => {}}
      />, {
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
