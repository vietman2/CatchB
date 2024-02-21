import { TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import CommunityMain from "./Main";
import PostCreate from "./PostCreate";
import PostDetail from "./PostDetail/PostDetail";
import { BackButton } from "../../components/Buttons";
import { SmallLogo } from "../../components/Logos";
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

  const WriteIcon = () => {
    return (
      <TouchableOpacity
        style={{ marginRight: 15 }}
        onPress={() => navigation.navigate("PostCreate")}
        testID="create-post-button"
      >
        <Icon source="pencil-plus-outline" size={24} color="black" />
      </TouchableOpacity>
    );
  };

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
          headerLeft: SmallLogo,
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
