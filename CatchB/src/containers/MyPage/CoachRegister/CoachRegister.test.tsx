import { fireEvent, waitFor } from "@testing-library/react-native";

import CoachRegister from "./CoachRegister";
import { renderWithProviders } from "../../../utils/test-utils";
import { admin } from "../../../variables/mvp_dummy_data/user";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  const mockButton = ({ children, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );

  return {
    PaperProvider: Provider,
    Text: "Text",
    TextInput: "TextInput",
    Button: mockButton,
  };
});
jest.mock("expo-document-picker", () => ({
  getDocumentAsync: jest.fn(),
}));
jest.mock("../../../components/Checkboxes/SingleCheck", () => "SingleCheck");
jest.mock("../../../components/Checkboxes/MultiCheck", () => "MultiCheck");
jest.mock("../../../components/Dialogs/AreaPicker", () => "AreaPicker");

describe("<CoachRegister />", () => {
  it("should render correctly", async () => {
    const { getByText } = renderWithProviders(<CoachRegister />, {
      preloadedState: {
        auth: {
          user: admin,
          token: "token",
        },
      },
    });

    await waitFor(() => fireEvent.press(getByText("Example")));
  });
});
