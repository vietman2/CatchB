import { render } from "@testing-library/react-native";

import SimpleCard from "./SimpleCard";
import CardBox from "./CardBox";

jest.mock("react-native-paper", () => {
  const { View, Text } = jest.requireActual("react-native");

  const MockTitle = (props: any) => (
    <View testID="CardTitle">
      <Text>{props.title}</Text>
      {props.left && <View testID="icon">{props.left()}</View>}
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
    ...jest.requireActual("react-native-paper"),
    Card: MockCard,
    Icon: "Icon",
  };
});

describe("<SimpleCard />", () => {
  it("renders the card with the correct title", () => {
    const { getByText } = render(
      <SimpleCard title="Card Title" icon="home">
        <></>
      </SimpleCard>
    );
    expect(getByText("Card Title")).toBeTruthy();
  });
});

describe("<CardBox />", () => {
  it("renders the box with the correct title", () => {
    const { getByText } = render(
      <CardBox
        title="Box Title"
        data="Box Data"
        description="Box Description"
        icon="home"
        iconColor="red"
      />
    );
    expect(getByText("Box Title")).toBeTruthy();
  });
});
