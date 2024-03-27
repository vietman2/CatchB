/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CommentList from "./CommentList";
import { sampleComments } from ".data/community";
import { admin } from ".data/users";
import * as CommentAPI from ".services/community/comment";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const ActualTextInput = jest.requireActual("react-native-paper").TextInput;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  const TextInput = (props: any) => {
    return <ActualTextInput {...props}>{props.right}</ActualTextInput>;
  };
  const TextInputIcon = ({ icon, onPress }: any) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{icon}</Text>
    </TouchableOpacity>
  );
  TextInput.Icon = TextInputIcon;

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Text: "Text",
    TextInput,
  };
});
jest.mock("../CommentSimple", () => ({
  CommentSimple: "CommentSimple",
}));
jest.mock(".components/Error", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");

  return {
    ErrorPage: ({ onRefresh }) => (
      <TouchableOpacity onPress={onRefresh} testID="refresh" />
    ),
  };
});
jest.mock(".components/Loading", () => ({
  LoadingPage: "LoadingPage",
}));
jest.mock(".components/ScrollView", () => ({
  ScrollView: "ScrollView",
}));

const Stack = createStackNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CommentList" component={CommentList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

jest.spyOn(CommentAPI, "getCommentList").mockResolvedValue({
  status: 200,
  data: {
    comments: sampleComments,
    numComments: sampleComments.length,
  },
});

describe("<CommentList />", () => {
  it("should handle comment post correctly", async () => {
    jest.spyOn(CommentAPI, "createComment").mockResolvedValue({
      status: 201,
      data: {
        comment: sampleComments[0],
      },
    });

    const { getByTestId, getByText } = await waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          auth: {
            token: "token",
            user: admin,
          },
        },
      })
    );

    await waitFor(() => {
      fireEvent.changeText(getByTestId("comment-input"), "new comment");
    });

    await waitFor(() => {
      fireEvent.press(getByText("send"));
    });
  });

  it("should handle comment post error correctly", async () => {
    jest.spyOn(CommentAPI, "createComment").mockResolvedValue({
      status: 500,
      data: {},
    });

    const { getByTestId, getByText } = await waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          auth: {
            token: "token",
            user: admin,
          },
        },
      })
    );

    await waitFor(() => {
      fireEvent.changeText(getByTestId("comment-input"), "new comment");
    });

    await waitFor(() => {
      fireEvent.press(getByText("send"));
    });
  });

  it("should handle error and refresh correctly", async () => {
    jest.spyOn(CommentAPI, "getCommentList").mockResolvedValue({
      status: 500,
      data: {},
    });

    const { getByTestId } = await waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          auth: {
            token: "token",
            user: admin,
          },
        },
      })
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("refresh"));
    });
  });
});
