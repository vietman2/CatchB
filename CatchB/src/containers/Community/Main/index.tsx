/* eslint-disable react/prop-types */
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CommunityList from "../PostLists/CommunityList";
import VideoList from "../PostLists/VideoList";
import { themeColors } from "../../../variables/colors";

const Tab = createMaterialTopTabNavigator();

function PlaceholderComponent() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="titleMedium">준비 중입니다.</Text>
    </View>
  );
}

function BaseballCommunity() {
  return <CommunityList mode="야구톡" />;
}

function RecruitmentCommunity() {
  return <CommunityList mode="모집" />;
}

export default function Community() {
  const width = Dimensions.get("window").width;

  return (
    <Tab.Navigator
      initialLayout={{ width }}
      screenOptions={{
        tabBarLabelStyle: styles.labelStyle,
        tabBarIndicatorStyle: styles.indicatorStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="야구톡"
        component={BaseballCommunity}
        initialParams={{
          mode: "야구톡",
        }}
      />
      <Tab.Screen
        name="모집"
        component={RecruitmentCommunity}
        initialParams={{
          mode: "모집",
        }}
      />
      <Tab.Screen name="벼룩시장" component={PlaceholderComponent} />
      <Tab.Screen name="자세분석" component={VideoList} />
      <Tab.Screen name="내 활동" component={PlaceholderComponent} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: themeColors.primary,
  },
  tabBarStyle: {
    backgroundColor: themeColors.primaryContainer,
  },
  labelStyle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});