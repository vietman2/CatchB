/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import * as IPicker from "expo-image-picker";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PostCreate from "./PostCreate";
import { renderWithProviders } from "../../../utils/test-utils";
import { sampleTags } from ".data/community";
import { admin } from ".data/users";
import * as mediaApi from ".services/community/media";
import * as communityApi from ".services/community/post";
import * as storage from ".store/storage/asyncStorage";

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
  const TextInputIcon = ({ onPress }: any) => (
    <TouchableOpacity onPress={onPress}>
      <Text>Upload</Text>
    </TouchableOpacity>
  );
  TextInput.Icon = TextInputIcon;
  TextInput.Affix = "Affix";

  const Snackbar = ({ onDismiss }: any) => {
    return (
      <TouchableOpacity onPress={onDismiss}>
        <Text>Snackbar</Text>
      </TouchableOpacity>
    );
  };

  return {
    PaperProvider: Provider,
    Icon: "Icon",
    Snackbar: Snackbar,
    Text: "Text",
    TextInput: TextInput,
  };
});
jest.mock("expo-image-picker", () => ({
  MediaTypeOptions: "MediaTypeOptions",
  launchImageLibraryAsync: jest.fn(),
}));
jest.mock("./fragments", () => {
  return {
    MyDivider: "MyDivider",
    Preview: "Preview",
    Tags: "Tags",
  };
});
jest.mock("../../../components/Selectors", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    Selector: ({ setSingleSelected }: any) => (
      <TouchableOpacity onPress={() => setSingleSelected("덕아웃")}>
        <Text>Selector</Text>
      </TouchableOpacity>
    ),
  };
});

const Stack = createStackNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PostCreate" component={PostCreate} />
        <Stack.Screen name="CommunityScreen" component={PostCreate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

jest.spyOn(storage, "getTemp").mockResolvedValue(null);

describe("<PostCreate />", () => {
  it("handles image upload: canceled", async () => {
    jest.spyOn(IPicker, "launchImageLibraryAsync").mockResolvedValue({
      canceled: true,
      assets: null,
    });

    const { getByText } = await waitFor(() =>
      renderWithProviders(<Components />)
    );

    waitFor(() => {
      fireEvent.press(getByText("Upload"));
    });
  });

  it("handles image upload", async () => {
    jest.spyOn(IPicker, "launchImageLibraryAsync").mockResolvedValue({
      canceled: false,
      assets: [
        {
          uri: "file://image.jpg",
          width: 100,
          height: 100,
          fileName: "image.jpg",
        },
      ],
    });
    jest.spyOn(mediaApi, "uploadImageFile").mockResolvedValue({
      status: 201,
      data: {
        url: "https://image.com",
        id: 1,
      },
    });
    jest.spyOn(communityApi, "createPost").mockResolvedValue({
      status: 400,
      data: {},
    });

    const { getByText } = await waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          auth: {
            user: admin,
            token: "token",
          },
        },
      })
    );

    await waitFor(() => {
      fireEvent.press(getByText("Upload"));
    });

    await waitFor(() => {
      fireEvent.press(getByText("Upload"));
      fireEvent.press(getByText("등록"));
    });
  });

  it("handles image upload: failed", async () => {
    jest.spyOn(IPicker, "launchImageLibraryAsync").mockResolvedValue({
      canceled: false,
      assets: [
        {
          uri: "file://image.jpg",
          width: 100,
          height: 100,
          fileName: "image.jpg",
        },
      ],
    });
    jest.spyOn(mediaApi, "uploadImageFile").mockResolvedValue({
      status: 400,
      data: {
        message: "error",
      },
    });

    const { getByText } = await waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          auth: {
            user: admin,
            token: "token",
          },
        },
      })
    );

    await waitFor(() => {
      fireEvent.press(getByText("Upload"));
      fireEvent.press(getByText("Snackbar"));
    });
  });

  it("handles temp save", async () => {
    jest.spyOn(storage, "saveTemp").mockImplementation();

    const { getByTestId, getByText } = await waitFor(() =>
      renderWithProviders(<Components />)
    );

    waitFor(() => {
      fireEvent.changeText(getByTestId("titleInput"), "Title");
      fireEvent.changeText(getByTestId("contentInput"), "Content");
      fireEvent.press(getByText("임시 저장"));
    });
  });

  it("handles create post", async () => {
    jest.spyOn(storage, "getTemp").mockResolvedValue({
      title: "Title",
      content: "Content",
      selectedForum: "덕아웃",
      uploadedImages: [],
    });
    jest.spyOn(communityApi, "createPost").mockResolvedValue({
      status: 201,
      data: {
        id: 1,
      },
    });
    jest.spyOn(mediaApi, "getTagsList").mockResolvedValue({
      status: 200,
      data: {
        덕아웃: sampleTags,
      },
    });
    jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

    const { getByText } = await waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          auth: {
            user: admin,
            token: "token",
          },
        },
      })
    );

    const alert = Alert.alert.mock.calls[0][2];

    waitFor(() => {
      alert[0].onPress();
      alert[1].onPress();
    });
    fireEvent.press(getByText("Selector"));

    waitFor(() => {
      fireEvent.press(getByText("등록"));
    });
  });

  it("handles create post: failed with message", async () => {
    jest.spyOn(communityApi, "createPost").mockResolvedValue({
      status: 400,
      data: {
        message: "error",
      },
    });

    const { getByText } = await waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          auth: {
            user: admin,
            token: "token",
          },
        },
      })
    );
    waitFor(() => {
      fireEvent.press(getByText("등록"));
    });
  });
});
