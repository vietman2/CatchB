import { render } from "@testing-library/react-native";

import { LessonProductsTable, ReservationProductsTable, ScheduleBar } from "./";
import { sampleLessonProducts } from "../../variables/mvp_dummy_data/lessons";
import { reservationProducts } from "../../variables/mvp_dummy_data/reservations";

jest.mock("react-native-paper", () => {
  return {
    Text: "Text",
  };
});
jest.mock("../Selectors", () => {
  return {
    Selector: "Selector",
  };
});

describe("<LessonProductsTable />", () => {
  it("renders correctly with no products", () => {
    render(<LessonProductsTable products={[]} />);
  });

  it("renders correctly with products", () => {
    render(<LessonProductsTable products={sampleLessonProducts} />);
  });
});

describe("<ReservationProductsTable />", () => {
  it("renders correctly with no products", () => {
    render(<ReservationProductsTable products={[]} />);
  });

  it("renders correctly with products", () => {
    render(<ReservationProductsTable products={reservationProducts} />);
  });
});

describe("<ScheduleBar />", () => {
  it("renders correctly", () => {
    render(<ScheduleBar />);
  });
});
