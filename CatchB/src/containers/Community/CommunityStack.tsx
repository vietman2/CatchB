import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import CommunityMain from "./Main";
import PostCreate from "./PostCreate";
import PostDetail from "./PostDetail";
import { BackButton } from ".components/Buttons";
import { SmallLogo } from ".components/Logos";
import { CommunityParams, CommunityScreenProps } from ".constants/navigation";

const CommunityStack = createStackNavigator<CommunityParams>();

export default function CommunityContainer() {
  const navigation =
    useNavigation<CommunityScreenProps<"CommunityScreen">["navigation"]>();

  const backToMain = () => {
    return (
      <BackButton onPress={() => navigation.navigate("CommunityScreen")} />
    );
  };

  const headerTitle = (title: string) => {
    return (
      <Text variant="headlineSmall" style={styles.bold}>
        {title}
      </Text>
    );
  };

  const HomeIcons = () => {
    return (
      <View style={styles.horizontal}>
        <TouchableOpacity
          style={styles.whiteSpace}
          onPress={() => {}}
          testID="create-steal-button"
        >
          <Icon source="video-plus-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteSpace}
          onPress={() => navigation.navigate("PostCreate")}
          testID="create-post-button"
        >
          <Icon source="pencil-plus-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const HelpIcon = () => {
    return (
      <View style={styles.horizontal}>
        <TouchableOpacity onPress={() => {}} style={styles.whiteSpace}>
          <Icon source="help-circle-outline" size={24} color="green" />
        </TouchableOpacity>
      </View>
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
          headerRight: () => <HomeIcons />,
        }}
      />
      <CommunityStack.Screen
        name="PostCreate"
        component={PostCreate}
        options={{
          headerLeft: () => backToMain(),
          headerTitle: () => headerTitle("포스트 작성"),
          headerRight: () => <HelpIcon />,
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

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
  },
  whiteSpace: {
    marginRight: 15,
  },
  bold: {
    fontWeight: "bold",
  },
});
