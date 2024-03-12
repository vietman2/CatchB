/* eslint-disable react/prop-types */
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
  BaseballCommunity,
  RecruitmentCommunity,
  VideoCommunity,
} from "../PostLists";
import { themeColors } from "../../../variables/colors";

const Tab = createMaterialTopTabNavigator();

// TODO: Remove This Later
export function PlaceholderComponent() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="titleMedium">준비 중입니다.</Text>
    </View>
  );
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
        name="덕아웃"
        component={BaseballCommunity}
        initialParams={{
          mode: "덕아웃",
        }}
      />
      <Tab.Screen
        name="드래프트"
        component={RecruitmentCommunity}
        initialParams={{
          mode: "드래프트",
        }}
      />
      <Tab.Screen name="장터" component={PlaceholderComponent} />
      <Tab.Screen name="스틸" component={VideoCommunity} />
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
