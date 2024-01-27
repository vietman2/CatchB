import { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { themeColors } from "../../../variables/colors";
import { render } from "@testing-library/react-native";

export default function Community() {
  const [activeTab, setActiveTab] = useState<"Recruit" | "Discuss">("Discuss");

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setActiveTab("Discuss")}
            style={activeTab === "Discuss" ? styles.active : styles.box}
          >
            <Text style={activeTab === "Discuss" ? styles.activeText : {}}>
              야구톡
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("Recruit")}
            style={activeTab === "Recruit" ? styles.active : styles.box}
          >
            <Text style={activeTab === "Recruit" ? styles.activeText : {}}>
              모집
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.primaryContainer,
  },
  tabs: {
    flexDirection: "row",
    marginTop: 5,
  },
  active: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    marginHorizontal: 5,
    backgroundColor: themeColors.secondaryContainer,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: themeColors.primary,
  },
  box: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    marginHorizontal: 5,
  },
  activeText: { 
    fontWeight: "bold" 
  },
});
