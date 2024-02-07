import { fireEvent, render } from "@testing-library/react-native";

import CoachStep2 from "./CoachStep2";

jest.mock("react-native-paper", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    TextInput: "TextInput",
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Text: "Text",
    Divider: "Divider",
  };
});
jest.mock("../../../components/Checkboxes/MultiCheck", () => "MultiCheck");

describe("<CoachStep2 />", () => {
  it("renders correctly and handles time textinputs", () => {
    const { getByTestId } = render(<CoachStep2 onFinish={jest.fn()} />);

    fireEvent.changeText(getByTestId("weekdayStart"), "1234");
    fireEvent.changeText(getByTestId("weekdayEnd"), "5678");
    fireEvent.changeText(getByTestId("saturdayStart"), "9101");
    fireEvent.changeText(getByTestId("saturdayEnd"), "1121");
    fireEvent.changeText(getByTestId("sundayStart"), "3141");
    fireEvent.changeText(getByTestId("sundayEnd"), "4151");
    fireEvent.changeText(getByTestId("sundayEnd"), "41511");
    fireEvent.changeText(getByTestId("sundayEnd"), "41-");
    fireEvent.changeText(getByTestId("sundayEnd"), "41");
  });

  it("handles other text inputs", () => {
    const { getByTestId } = render(<CoachStep2 onFinish={jest.fn()} />);

    fireEvent.changeText(getByTestId("curriculum"), "curriculum");
    fireEvent.changeText(getByTestId("career"), "career");
  });

  it("handles the finish button", () => {
    const onFinish = jest.fn();
    const { getByText } = render(<CoachStep2 onFinish={onFinish} />);

    fireEvent.press(getByText("다음 (1/3)"));
  });
});
