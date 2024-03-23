/* eslint-disable react/prop-types */
import { Dimensions, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
  BaseballCommunity,
  RecruitmentCommunity,
  VideoCommunity,
} from "../PostLists";
import { NotReady } from ".components/Loading";
import { themeColors } from ".themes/colors";

const Tab = createMaterialTopTabNavigator();

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
      <Tab.Screen name="장터" component={NotReady} />
      <Tab.Screen name="스틸" component={VideoCommunity} />
      <Tab.Screen name="내 활동" component={NotReady} />
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
