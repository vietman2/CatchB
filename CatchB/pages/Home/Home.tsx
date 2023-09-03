import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import Search from "../../components/Search";
import Shortcut from "../../components/Shortcut";
import { RootTabParamList } from "../../containers/TabContainer";
import { styles } from "./styles";
import Heading from "../../components/Heading";

type HomeProps = BottomTabScreenProps<RootTabParamList, "Home">;

export default function Home({ navigation }: HomeProps) {
  const Shortcuts = () => {
    return (
      <View style={styles.shortcuts}>
        <Shortcut
          imageNumber={1}
          title="레슨"
          description={"우리 동네 야구레슨\n가격비교"}
        />
        <Shortcut
          imageNumber={2}
          title="대관"
          description={"근처 야구 실내 연습장\n간편 예약"}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <ScrollView>
        <Search />
        <Shortcuts />
        <View style={styles.ads}>
          <Text style={{ fontSize: 30, color: "yellow" }}>광고</Text>
        </View>
        <Heading title="최근 본 시설" />
      </ScrollView>
    </SafeAreaView>
  );
}
