import { fireEvent, render } from "@testing-library/react-native";

import CoachRegister from "./CoachRegister";

jest.mock("./CoachStep1", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");

  return ({ onFinish }: { onFinish: void }) => {
    return (
      <TouchableOpacity onPress={onFinish}>
        <Text>CoachStep1</Text>
      </TouchableOpacity>
    );
  };
});
jest.mock("./CoachStep2", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");

  return ({ onFinish }: { onFinish: void }) => {
    return (
      <TouchableOpacity onPress={onFinish}>
        <Text>CoachStep2</Text>
      </TouchableOpacity>
    );
  };
});
jest.mock("./CoachStep3", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");

  return ({ onFinish }) => {
    return (
      <TouchableOpacity onPress={onFinish}>
        <Text>CoachStep3</Text>
      </TouchableOpacity>
    );
  };
});
jest.mock("./CoachStep4", () => "CoachStep4");

describe("CoachRegister", () => {
  it("should render and handle steps", () => {
    const { getByText } = render(<CoachRegister />);

    fireEvent.press(getByText("CoachStep1"));
    fireEvent.press(getByText("CoachStep2"));
    fireEvent.press(getByText("CoachStep3"));
  });
});
