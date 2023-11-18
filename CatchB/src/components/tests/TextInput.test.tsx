import { render } from "@testing-library/react-native";

import { MyTextInput } from "../TextInput";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("<MyTextInput />", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <MyTextInput
        placeholder="Test Placeholder"
        onChangeText={() => {}}
        value="Test Value"
      />
    );

    expect(getByTestId("textInput")).toBeTruthy();
  });

  it("renders with icon", () => {
    const { getByTestId } = render(
      <MyTextInput
        iconName="test-icon"
        placeholder="Test Placeholder"
        onChangeText={() => {}}
        value="Test Value"
      />
    );

    expect(getByTestId("textInput")).toBeTruthy();
  });
});
