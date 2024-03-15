import { fireEvent } from "@testing-library/react-native";

import { LoginDialog, SwitchModeDialog } from ".components/Dialogs";
import { admin, exampleUser } from ".data/users";
import { renderWithProviders } from ".utils/test-utils";

describe("<LoginDialog />", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(
      <LoginDialog visible={true} onClose={() => {}} />
    );

    fireEvent.press(getByText("확인"));
  });
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
