/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent } from "@testing-library/react-native";

import FacilityStep3 from "./FacilityStep3";

jest.mock("react-native-paper", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");
  return {
    Text: "Text",
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Icon: "Icon",
  };
});

describe("<FacilityStep3 />", () => {
  it("should handle <FacilityStep3 /> correctly", async () => {
    const { getByText } = render(<FacilityStep3 onFinish={() => {}} />);

    fireEvent.press(getByText("완료 (2/3)"));
  });
});
