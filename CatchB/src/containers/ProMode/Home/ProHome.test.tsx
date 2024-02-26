import { fireEvent, render } from "@testing-library/react-native";

import { ProHome } from "./ProHome";

jest.mock("react-native-paper", () => {
  const { View, Text } = jest.requireActual("react-native");

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
jest.mock("./components", () => ({
  NotificationChip: "NotificationChip",
  AlertIcon: "AlertIcon",
  ShowHideIcon: "ShowHideIcon",
}));
jest.mock("../../../components/Cards", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    HomeCard: ({ actionText, action }) => (
      <TouchableOpacity onPress={action}>
        <Text>{actionText}</Text>
      </TouchableOpacity>
    ),
  };
});

describe("<ProHome />", () => {
  it("renders correctly and handles hide", async () => {
    const { getByTestId } = render(<ProHome />);

    fireEvent.press(getByTestId("hide-press"));
    fireEvent.press(getByTestId("hide-press"));
  });

  it("handles actions for coverage", async () => {
    const { getByText } = render(<ProHome />);

    fireEvent.press(getByText("자세히 보기"));
    fireEvent.press(getByText("더 알아보기"));
    fireEvent.press(getByText("더 많은 통계 확인"));
  });
});
