import { render } from "@testing-library/react-native";

import MyPage from "../MyPage";

jest.mock("react-native-vector-icons/Ionicons", () => "Icon");

describe("MyPage", () => {
  it("renders correctly", () => {
    const { getByText } = render(<MyPage />);
    expect(getByText("Catch B")).toBeTruthy();
    expect(getByText("캐치비")).toBeTruthy();
  });
});
