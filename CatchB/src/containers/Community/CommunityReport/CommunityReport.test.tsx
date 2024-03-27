import { fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PostReport from "./CommunityReport";
import { sampleComments, samplePosts } from ".data/community";
import { admin } from ".data/users";
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
    TextInput: "TextInput",
  };
});
jest.mock("expo-image-picker", () => ({
  ImagePickerAsset: "ImagePickerAsset",
}));
jest.mock("../Comments", () => ({
  CommentSimple: "CommentSimple",
}));
jest.mock("../fragments", () => ({
  InputText: "InputText",
  PostHeader: "PostHeader",
}));
jest.mock(".components/Pickers", () => ({
  ImagePicker: "ImagePicker",
}));
jest.mock(".components/Selectors", () => ({
  Selector: "Selector",
}));

const Stack = createStackNavigator();

const Components = ({type}: {type: "p"|"c"|"r"}) => {
  const params = () => {
    if (type === "p") {
      return {
        type: "post",
        post: samplePosts[0],
      }
    } else if (type === "c") {
      return {
        type: "comment",
        comment: sampleComments[0],
      }
    }
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PostReport"
          component={PostReport}
          initialParams={params()}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<PostReport />", () => {
  it("should handle post report", () => {
    const { getByText } = renderWithProviders(<Components type="p" />, {
      preloadedState: {
        auth: {
          token: "token",
          user: admin,
        },
      },
    });

    fireEvent.press(getByText("신고하기"));
  });

  it("should handle comment report", () => {
    const { getByText } = renderWithProviders(<Components type="c" />, {
      preloadedState: {
        auth: {
          token: "token",
          user: admin,
        },
      },
    });

    fireEvent.press(getByText("신고하기"));
  });
});
