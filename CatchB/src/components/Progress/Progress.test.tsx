import { render } from "@testing-library/react-native";

import { ProgressSteps } from ".components/Progress";

describe("<ProgressSteps />", () => {
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

  it("renders early stage correctly", () => {
    render(<ProgressSteps steps={steps} currentStep={0} />);
  });

  it("renders late stage correctly", () => {
    render(<ProgressSteps steps={steps} currentStep={1} />);
  });
});
