/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import PostDetail from "./PostDetail";
import { samplePosts } from ".data/community";
import { admin } from ".data/users";
import * as PostAPI from ".services/community/post";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Text: "Text",
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../Comments", () => "Comments");
jest.mock("../fragments", () => ({
  PostHeader: "PostHeader",
}));
jest.mock(".components/Buttons", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");

  return {
    CommunityButton: ({ mode, action }) => (
      <TouchableOpacity onPress={action} testID={mode} />
    ),
  };
});
jest.mock(".components/Error", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");

  return {
    ErrorPage: ({ onRefresh }) => <TouchableOpacity onPress={onRefresh} testID="error" />,
  };
});
jest.mock(".components/Loading", () => ({
  LoadingPage: "LoadingPage",
}));

jest.spyOn(PostAPI, "getPostDetail").mockResolvedValue({
  status: 200,
  data: samplePosts[0],
});

const Stack = createStackNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
          initialParams={{
            postId: 0,
          }}
        />
        <Stack.Screen name="CommunityReport" component={PostDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<PostDetail />", () => {
  it("renders and gets response correctly", () => {
    waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          community: {
            selectedPostId: 0,
          },
        },
      })
    );
  });

  it("handles buttons correctly", async () => {
    jest.spyOn(PostAPI, "postLike").mockResolvedValue({
      status: 200,
      data: samplePosts[0],
    });
    jest.spyOn(PostAPI, "postDislike").mockResolvedValue({
      status: 200,
      data: samplePosts[0],
    });

    const { getByTestId } = await waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          auth: {
            user: admin,
            token: "token",
          },
          community: {
            selectedPostId: 0,
          },
        },
      })
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("like"));
      fireEvent.press(getByTestId("dislike"));
    });

    waitFor(() => {
      fireEvent.press(getByTestId("report"));
    });
  });

  it("handles button errors correctly", async () => {
    jest.spyOn(PostAPI, "postLike").mockResolvedValue({
      status: 500,
      data: null,
    });
    jest.spyOn(PostAPI, "postDislike").mockResolvedValue({
      status: 500,
      data: null,
    });

    const { getByTestId } = await waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          auth: {
            user: admin,
            token: "token",
          },
          community: {
            selectedPostId: 0,
          },
        },
      })
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("like"));
      fireEvent.press(getByTestId("dislike"));
    });
  });

  it("handles error correctly", async () => {
    jest.spyOn(PostAPI, "getPostDetail").mockResolvedValue({
      status: 500,
      data: null,
    });

    const { getByTestId } = await waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          community: {
            selectedPostId: 0,
          },
        },
      })
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("error"));
    });
  });
});
