import { render } from "@testing-library/react-native";

import { ProgressSteps } from "./";

const steps = [
  {
    step: 0,
    label: "Step 0",
  },
  {
    step: 1,
    label: "Step 1",
  },
];

describe("<ProgressSteps />", () => {
  it("renders early stage correctly", () => {
    render(<ProgressSteps steps={steps} currentStep={0} />);
  });

  it("renders late stage correctly", () => {
    render(<ProgressSteps steps={steps} currentStep={1} />);
  });
});
