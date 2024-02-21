import { fireEvent } from "@testing-library/react-native";

import LoginDialog from "./";
import { renderWithProviders } from "../../../utils/test-utils";



describe("<LoginDialog />", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(
      <LoginDialog
        visible={true}
        onClose={() => {}}
      />
    );

    fireEvent.press(getByText("확인"));
  });
});
