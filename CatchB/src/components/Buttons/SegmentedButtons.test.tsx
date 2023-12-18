import { render, fireEvent } from "@testing-library/react-native";

import SegmentedButtons from "./SegmentedButtons";

describe("SegmentedButtons", () => {
  it("renders without crashing", () => {
    render(
      <SegmentedButtons tab="Dashboard" onPress={() => {}} />
    );
  });

  it("should handle onPress", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <SegmentedButtons tab="Dashboard" onPress={onPress} />
    );
    fireEvent.press(getByText("대시보드"));
    fireEvent.press(getByText("매출관리"));
    fireEvent.press(getByText("예약관리"));
    fireEvent.press(getByText("업무관리"));
    fireEvent.press(getByText("고객관리"));
  });

  it("should handle styles 1", () => {
    const onPress = jest.fn();
    render(
      <SegmentedButtons tab="Sales" onPress={onPress} />
    );
  });

  it("should handle styles 2", () => {
    const onPress = jest.fn();
    render(
      <SegmentedButtons tab="Reservation" onPress={onPress} />
    );
  });

  it("should handle styles 3", () => {
    const onPress = jest.fn();
    render(
      <SegmentedButtons tab="Tasks" onPress={onPress} />
    );
  });

  it("should handle styles 4", () => {
    const onPress = jest.fn();
    render(
      <SegmentedButtons tab="Customers" onPress={onPress} />
    );
  });
});
