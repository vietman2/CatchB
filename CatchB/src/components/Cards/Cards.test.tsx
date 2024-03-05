import { render } from "@testing-library/react-native";

import { HomeCard, StatsCard } from "./";

jest.mock("react-native-paper", () => ({
  Icon: "Icon",
  Text: "Text",
}));

describe("<MyCard />", () => {
  it("renders type 1 correctly", () => {
    render(
      <HomeCard
        title="Title"
        content="Content"
        type={1}
        icon="icon"
        chip="chip"
      />
    );
  });

  it("renders type 2 correctly", () => {
    render(
      <HomeCard
        title="Title"
        content="Content"
        type={2}
        actionText="Action"
        action={jest.fn()}
        chip="chip"
      />
    );
  });

  it("renders type 3 correctly", () => {
    render(
      <HomeCard
        title="Title"
        content="Content"
        type={3}
        actionText="Action"
        action={jest.fn()}
        icon="icon"
      />
    );
  });

  it("renders type 4 correctly", () => {
    render(
      <HomeCard
        title="Title"
        content="Content"
        type={4}
        actionText="Action"
        action={jest.fn()}
        icon="icon"
        chip="chip"
      />
    );
  });
});

describe("<StatsCard />", () => {
  it("renders correctly", () => {
    render(
      <StatsCard
        title="Title"
        content="Content"
        icon="icon"
        iconColor="color"
      />
    );
  });

  it("renders no icons correctly", () => {
    render(<StatsCard title="Title" content="Content" />);
  });
});
