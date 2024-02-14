/* eslint-disable react/prop-types */
import { useState } from "react";
import { View, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import {
  TabView,
  TabBar,
  SceneRendererProps,
  Route,
} from "react-native-tab-view";

import CommunityList from "../PostLists/CommunityList";
import VideoList from "../PostLists/VideoList";
import { themeColors } from "../../../variables/colors";

export default function Community() {
  const width = Dimensions.get("window").width;
  const [index, setIndex] = useState(0);
  const routes = [
    { key: "야구톡", title: "야구톡" },
    { key: "모집", title: "모집" },
    { key: "벼룩시장", title: "벼룩시장" },
    { key: "자세 분석", title: "자세 분석" },
    { key: "내 활동", title: "내 활동" },
  ];

  const PlaceholderComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text variant="titleMedium">준비 중입니다.</Text>
      </View>
    );
  }

  const renderScene = (
    props: SceneRendererProps & {
      route: Route;
    }
  ) => {
    if (props.route.key === "야구톡") {
      return <CommunityList mode="야구톡" />;
    } else if (props.route.key === "모집") {
      return <CommunityList mode="모집" />;
    } else if (props.route.key === "자세 분석") {
      return <VideoList />;
    } else {
      return <PlaceholderComponent />;
    }
  };

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: themeColors.primary,
        }}
        style={{
          backgroundColor: themeColors.primaryContainer,
        }}
        tabStyle={{ width: "auto", paddingHorizontal: 15 }}
        labelStyle={{ fontWeight: "bold" }}
        gap={5}
        renderLabel={({ route, color }) => (
          <Text variant="titleMedium" style={{ color, fontWeight: "bold" }}>
            {route.title}
          </Text>
        )}
        activeColor="green"
        inactiveColor="gray"
        scrollEnabled
      />
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: width }}
      renderTabBar={renderTabBar}
    />
  );
}
