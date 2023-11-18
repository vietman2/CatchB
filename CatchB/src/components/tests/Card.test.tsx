import { render } from "@testing-library/react-native";

import Card from "../Card";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("<Card />", () => {
  it("renders the title, description, and icon correctly", () => {
    const title = "Test Title";
    const description = "Test Description";
    const icon = "test-icon";

    const { getByText } = render(
      <Card title={title} description={description} icon={icon} />
    );

    expect(getByText(title)).toBeTruthy();
    expect(getByText(description)).toBeTruthy();
  });

  it("renders correctly when description is undefined", () => {
    const title = "Test Title";
    const icon = "test-icon";

    const { getByText, queryByText } = render(
      <Card title={title} description={undefined} icon={icon} />
    );

    expect(getByText(title)).toBeTruthy();
    expect(queryByText("undefined")).toBeNull();
  });
});
