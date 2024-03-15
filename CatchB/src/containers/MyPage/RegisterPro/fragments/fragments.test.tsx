import { fireEvent, render } from "@testing-library/react-native";

import {
  MainTitle,
  SubTitle,
  DisabledTextInput,
  IconButton,
  IconText,
  BankAccountPreview,
  Bank,
  BankChoice
} from "./fragments";
import { sampleBankAccounts, sampleBanks } from ".data/payments";

jest.mock("react-native-paper", () => ({
  Icon: "Icon",
  Text: "Text",
}));
jest.mock("react-native-svg", () => ({
  SvgCssUri: "SvgCssUri",
}));

describe("<MainTitle />", () => {
  it("renders no sub correctly", () => {
    render(<MainTitle text="Hello" />);
  });

  it("renders with sub correctly", () => {
    render(<MainTitle text="Hello" sub="asdf" />);
  });
});

describe("<SubTitle />", () => {
  it("renders no sub correctly", () => {
    render(<SubTitle text="Hello" />);
  });

  it("renders with sub correctly", () => {
    render(<SubTitle text="Hello" sub="asdf" />);
  });
});

describe("<DisabledTextInput />", () => {
  it("renders correctly", () => {
    render(<DisabledTextInput text="Hello" />);
  });
});

describe("<IconButton />", () => {
  it("renders correctly", () => {
    const { getByText } = render(<IconButton text="Hello" icon="icon" />);

    fireEvent.press(getByText("Hello"));
  });
});

describe("<IconText />", () => {
  it("renders correctly", () => {
    render(<IconText text="Hello" icon="icon" />);
  });
});

describe("<BankAccountPreview />", () => {
  it("renders correctly", () => {
    render(<BankAccountPreview account={sampleBankAccounts[0]} />);
  });
});

describe("<Bank />", () => {
  it("renders no bank correctly", () => {
    render(<Bank bank={null} />);
  });
  
  it("renders bank correctly", () => {
    render(<Bank bank={sampleBanks[0]} />);
  });
});

describe("<BankChoice />", () => {
  it("renders correctly", () => {
    render(<BankChoice bank={sampleBanks[0]} />);
  });
});
