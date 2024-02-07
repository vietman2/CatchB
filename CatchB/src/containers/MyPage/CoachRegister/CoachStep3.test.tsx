/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render } from "@testing-library/react-native";

import CoachStep3 from "./CoachStep3";

jest.mock("react-native-paper", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress} accessibilityLabel="버튼">
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Divider: "Divider",
    Icon: "Icon",
    Text: "Text",
  };
});

describe("<CoachStep3 />", () => {
  it("renders correctly and handles button press", () => {
    const { getByText } = render(<CoachStep3 onFinish={jest.fn()} />);

    fireEvent.press(getByText("다음 (2/3)"));
  });
});
