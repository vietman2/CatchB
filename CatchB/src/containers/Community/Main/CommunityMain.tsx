/* eslint-disable react/prop-types */
import { Dimensions, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { PlaceholderComponent } from "./";
import {
  BaseballCommunity,
  RecruitmentCommunity,
  VideoCommunity,
} from "../PostLists";
import { themeColors } from "../../../variables/colors";

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
      <Tab.Screen name="자세분석" component={VideoCommunity} />
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
