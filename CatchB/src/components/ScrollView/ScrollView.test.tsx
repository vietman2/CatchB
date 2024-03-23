import { render, waitFor } from "@testing-library/react-native";

import ScrollWithRefresh from "./ScrollWithRefresh";

describe("<ScrollWithRefresh />", () => {
  it("renders correctly and handles scroll down", () => {
    const { getByTestId } = render(
      <ScrollWithRefresh refreshing={false} onRefresh={jest.fn()}>
        <></>
      </ScrollWithRefresh>
    );

    const scrollView = getByTestId("scroll-view");
    waitFor(() => {
      scrollView.props.onScroll({
        nativeEvent: { contentOffset: { y: -150 } },
      });
      scrollView.props.onScrollEndDrag();

      scrollView.props.onScroll({ nativeEvent: { contentOffset: { y: -50 } } });
      scrollView.props.onScrollEndDrag();
    });
  });
});
