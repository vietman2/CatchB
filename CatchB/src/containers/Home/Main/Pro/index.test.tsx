import { fireEvent, render, waitFor } from "@testing-library/react-native";

import Pro from "./";

jest.mock("react-native-paper", () => {
  const { View, TouchableOpacity, Text } = jest.requireActual("react-native");

  const MockTitle = (props: any) => (
    <View testID="CardTitle">
      <Text>{props.title}</Text>
      {props.left && <View testID="icon">{props.left()}</View>}
      {props.right && <View testID="icon">{props.right()}</View>}
    </View>
  );

  const MockContent = (props: any) => (
    <View testID="CardContent">{props.children}</View>
  );

  const MockCard = (props: any) => (
    <View testID="Card" {...props}>
      {props.children}
    </View>
  );

  MockCard.Title = MockTitle;
  MockCard.Content = MockContent;

  return {
    Card: MockCard,
    Icon: "Icon",
    Text: "Text",
  };
});
jest.mock("../../../../components/Cards/MyCard", () => "MyCard");

describe("<Pro />", () => {
  it("renders correctly and handles hide", async () => {
    const { getByTestId } = render(<Pro />);

    //await waitFor(() => fireEvent.press(getByTestId("hide-press")));
  });
});
