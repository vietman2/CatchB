import { render } from "@testing-library/react-native";

import ProfileBadge from "../ProfileBadge";
import { admin } from "../../variables/mvp_dummy_data/user";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("<ProfileBadge />", () => {
  it("renders the profile badge component", () => {
    render(<ProfileBadge user={null} />);
  });

  it("renders the profile badge component with user", () => {
    render(<ProfileBadge user={admin} />);
  });
});
