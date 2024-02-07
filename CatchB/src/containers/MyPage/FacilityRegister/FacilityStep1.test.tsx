/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FacilityStep1 from "./FacilityStep1";
import { renderWithProviders } from "../../../utils/test-utils";
import { admin } from "../../../variables/mvp_dummy_data/user";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  const { Dialog } = jest.requireActual("react-native-paper");

  return {
    PaperProvider: Provider,
    Text: "Text",
    TextInput: "TextInput",
    Portal: "Portal",
    Button: ({ children, onPress }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Dialog,
    Chip: "Chip",
  };
});
jest.mock("@actbase/react-daum-postcode", () => {
  const { View, Text, TouchableOpacity } = jest.requireActual("react-native");

  const mockPostCode = ({ onSelected, onError }) => (
    <View>
      <Text>PostCode</Text>
      <TouchableOpacity onPress={onSelected}>
        <Text>onSelected</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onError}>
        <Text>onError</Text>
      </TouchableOpacity>
    </View>
  );

  return mockPostCode;
});
jest.mock("@actbase/react-daum-postcode/lib/types", () => ({
  OnCompleteParams: "OnCompleteParams",
}));

const Stack = createStackNavigator();
const Component = () => <FacilityStep1 onFinish={jest.fn()} />;

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FacilityStep1" component={Component} />
        <Stack.Screen name="MyPageScreen" component={Component} />
      </Stack.Navigator>
    </NavigationContainer>,
    {
      preloadedState: {
        auth: {
          user: admin,
          token: "token",
        },
      },
    }
  );
};

describe("<FacilityStep1 />", () => {
  it("should handle <FacilityStep1 /> correctly", async () => {
    const { getByPlaceholderText, getByText } = render();

    const facilityNameInput = getByPlaceholderText("시설 이름을 입력하세요");
    const address2Input = getByPlaceholderText("상세주소를 입력하세요");

    await waitFor(() => {
      fireEvent.changeText(facilityNameInput, "시설 이름");
      fireEvent.changeText(address2Input, "상세 주소");
      fireEvent.press(getByText("검색"));
      fireEvent.press(getByText("onSelected"));
      fireEvent.press(getByText("검색"));
      fireEvent.press(getByText("onError"));
      fireEvent.press(getByText("취소"));
      fireEvent.press(getByText("등록하기"));
    });
  });

  it("should handle contact inputs", async () => {
    const { getByPlaceholderText } = render();

    const contactInput = getByPlaceholderText("- 없이 숫자만 입력하세요");

    await waitFor(() => {
      fireEvent.changeText(contactInput, "0");
      fireEvent.changeText(contactInput, "010-");
      fireEvent.changeText(contactInput, "010");
      fireEvent.changeText(contactInput, "0101234");
      fireEvent.changeText(contactInput, "01012341234");
      fireEvent.changeText(contactInput, "021234");
      fireEvent.changeText(contactInput, "021234123");
      fireEvent.changeText(contactInput, "0212341234");
      fireEvent.changeText(contactInput, "0311234");
      fireEvent.changeText(contactInput, "03112341234");
    });
  });

  it("should handle reg num inputs", async () => {
    const { getByPlaceholderText } = render();

    const registrationNumberInput = getByPlaceholderText(
      "사업자 등록번호를 입력하세요 (- 제외)"
    );

    await waitFor(() => {
      fireEvent.changeText(registrationNumberInput, "123-");
      fireEvent.changeText(registrationNumberInput, "123");
      fireEvent.changeText(registrationNumberInput, "1234567890");
    });
  });
});
