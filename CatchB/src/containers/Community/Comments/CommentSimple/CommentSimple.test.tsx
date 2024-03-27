import { fireEvent, waitFor } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CommentSimple from "./CommentSimple";
import { sampleComments } from ".data/community";
import { admin } from ".data/users";
import * as commentAPI from ".services/community/comment";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Icon: "Icon",
    Text: "Text",
  };
});
jest.mock(".components/Selectors", () => ({
  Selector: "Selector",
}));

const Stack = createStackNavigator();

const Components = ({ index }: { index: number }) => {
  const Component = () => (
    <CommentSimple initialComment={sampleComments[index]} />
  );
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CommentSimple" component={Component} />
        <Stack.Screen name="CommunityReport" component={Component} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<CommentSimple />", () => {
  it("should render liked comment correctly", () => {
    waitFor(() => renderWithProviders(<Components index={0} />));
  });

  it("should render disliked comment correctly", () => {
    waitFor(() => renderWithProviders(<Components index={1} />));
  });

  it("should handle like/dislike button click", async () => {
    jest.spyOn(commentAPI, "commentLike").mockResolvedValue({
      status: 200,
      data: sampleComments[0],
    });
    jest.spyOn(commentAPI, "commentDislike").mockResolvedValue({
      status: 200,
      data: sampleComments[0],
    });

    const { getByTestId } = await waitFor(() =>
      renderWithProviders(<Components index={0} />, {
        preloadedState: {
          auth: {
            token: "token",
            user: admin,
          },
        },
      })
    );

    waitFor(() => {
      fireEvent.press(getByTestId("like"));
      fireEvent.press(getByTestId("dislike"));
    });
  });

  it("should handle like/dislike button click fail", async () => {
    jest.spyOn(commentAPI, "commentLike").mockResolvedValue({
      status: 400,
      data: {},
    });
    jest.spyOn(commentAPI, "commentDislike").mockResolvedValue({
      status: 400,
      data: {},
    });

    const { getByTestId } = await waitFor(() =>
      renderWithProviders(<Components index={0} />, {
        preloadedState: {
          auth: {
            token: "token",
            user: admin,
          },
        },
      })
    );

    fireEvent.press(getByTestId("like"));
    fireEvent.press(getByTestId("dislike"));
  });

  it("should handle report button click", async () => {
    const { getByTestId } = await waitFor(() =>
      renderWithProviders(<Components index={0} />)
    );

    waitFor(() => fireEvent.press(getByTestId("report")));
  });
});
