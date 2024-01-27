import { useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Text, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  TabView,
  TabBar,
  SceneRendererProps,
  Route,
} from "react-native-tab-view";

import CommunityList from "../PostLists/CommunityList";
import VideoList from "../PostLists/VideoList";
import { themeColors } from "../../../variables/colors";
import { CommunityStackScreenProps } from "../../../variables/navigation";

export default function Community() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    { key: "야구톡", title: "야구톡" },
    { key: "모집", title: "모집" },
    { key: "벼룩시작", title: "벼룩시장" },
    { key: "내 활동", title: "내 활동" },
    { key: "자세 분석", title: "자세 분석" },
  ]);

  const [visible, setVisible] = useState(true);
  const navigation =
    useNavigation<CommunityStackScreenProps<"CommunityScreen">["navigation"]>();

  const PlaceholderComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text variant="titleMedium">준비 중입니다.</Text>
      </View>
    );
  };

  const renderScene = (
    props: SceneRendererProps & {
      route: Route;
    }
  ) => {
    switch (props.route.key) { // eslint-disable: prop-types
      case "야구톡":
        return (
          <CommunityList
            hideFAB={() => setVisible(false)}
            showFAB={() => setVisible(true)}
            mode="야구톡"
          />
        );
      case "모집":
        return (
          <CommunityList
            hideFAB={() => setVisible(false)}
            showFAB={() => setVisible(true)}
            mode="모집"
          />
        );
      case "자세 분석":
        return <VideoList />;
      case "벼룩시장":
        return <PlaceholderComponent />;
      case "내 활동":
        return <PlaceholderComponent />;
      default:
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
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      <FAB
        icon="plus"
        visible={visible}
        style={{ position: "absolute", right: 10, bottom: 10 }}
        onPress={() => navigation.navigate("PostCreate")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    backgroundColor: themeColors.primaryContainer,
  },
  active: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: themeColors.secondaryContainer,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: themeColors.primary,
  },
  box: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 5,
  },
  activeText: {
    fontWeight: "bold",
  },
});
