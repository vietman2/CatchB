import { render } from "@testing-library/react-native";

import { LessonsTable, ReservationsTable, TimeBar } from ".components/Tables";
import { sampleLessonProducts } from "../../variables/mvp_dummy_data/lessons";
import { reservationProducts } from "../../variables/mvp_dummy_data/reservations";

jest.mock("react-native-paper", () => ({
  Text: "Text",
}));
jest.mock("../Selectors", () => ({
  Selector: "Selector",
}));

describe("<LessonProductsTable />", () => {
  it("renders correctly with no products", () => {
    render(<LessonsTable products={[]} />);
  });

  it("renders correctly with products", () => {
    render(<LessonsTable products={sampleLessonProducts} />);
  });
});

describe("<ReservationProductsTable />", () => {
  it("renders correctly with no products", () => {
    render(<ReservationsTable products={[]} />);
  });

  it("renders correctly with products", () => {
    render(<ReservationsTable products={reservationProducts} />);
  });
});

describe("<ScheduleBar />", () => {
  it("renders correctly", () => {
    render(<TimeBar />);
  });
});
