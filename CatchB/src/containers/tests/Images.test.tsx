import { render } from "@testing-library/react-native";

import Images from "../Images";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("[Images] screen rendering test", () => {
  it("should render correctly", () => {
    render(<Images />);
  });
});
