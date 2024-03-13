import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PostCreate from "./PostCreate";
import { renderWithProviders } from "../../../utils/test-utils";
import * as storage from "../../../store/asyncStorage";
import * as api from "../../../services/community/media";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Snackbar: "Snackbar",
    Text: "Text",
    TextInput: {
      ...jest.requireActual("react-native-paper").TextInput,
      Affix: "Affix",
      Icon: "Icon",
    },
  };
});
jest.mock("expo-image-picker", () => ({
  MediaTypeOptions: "MediaTypeOptions",
  launchImageLibraryAsync: jest.fn(),
}));
jest.mock("./fragments", () => ({
  Buttons: "Buttons",
  ImageList: "ImageList",
  MyDivider: "MyDivider",
  Preview: "Preview",
  Tags: "Tags",
}));
jest.mock("../../../components/Selectors", () => ({
  Selector: "Selector",
}));

jest.spyOn(storage, "getTemp").mockResolvedValue({
  title: "title",
  content: "content",
  selectedForum: "selectedForum",
  uploadedImages: [],
});
jest.spyOn(api, "getTagsList").mockResolvedValue({ status: 200, data: {} });

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

describe("<PostCreate />", () => {
  it("renders correctly", () => {
    waitFor(() => renderWithProviders(<Components />));
  });
});
