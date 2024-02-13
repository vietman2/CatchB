import { TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import CommunityMain from "./Main/CommunityMain";
import PostCreate from "./PostCreate/PostCreate";
import PostDetail from "./PostDetail/PostDetail";
import BackButton from "../../components/Buttons/BackButton";
import { leftTitle } from "../../components/Logos/TopBar";
import {
  CommunityStackParamList,
  CommunityStackScreenProps,
} from "../../variables/navigation";

const CommunityStack = createStackNavigator<CommunityStackParamList>();

export default function CommunityContainer() {
  const navigation =
    useNavigation<CommunityStackScreenProps<"CommunityScreen">["navigation"]>();

  const backToMain = () => {
    return (
      <BackButton onPress={() => navigation.navigate("CommunityScreen")} />
    );
  };

  const headerTitle = (title: string) => {
    return (
      <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
        {title}
      </Text>
    );
  };

  function WriteIcon() {
    return (
      <TouchableOpacity
        style={{ marginRight: 15 }}
        onPress={() => navigation.navigate("PostCreate")}
      >
        <Icon source="pencil-plus-outline" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  return (
    <CommunityStack.Navigator
      initialRouteName="CommunityScreen"
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <CommunityStack.Screen
        name="CommunityScreen"
        component={CommunityMain}
        options={{
          headerLeft: leftTitle,
          headerTitle: () => null,
          headerRight: () => WriteIcon(),
        }}
      />
      <CommunityStack.Screen
        name="PostCreate"
        component={PostCreate}
        options={{
          headerLeft: () => backToMain(),
          headerTitle: () => headerTitle("글 작성"),
        }}
      />
      <CommunityStack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{
          headerLeft: () => backToMain(),
          headerTitle: () => headerTitle("글 상세"),
        }}
      />
    </CommunityStack.Navigator>
  );
}
