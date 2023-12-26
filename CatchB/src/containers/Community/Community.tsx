import { View, StyleSheet } from "react-native";
import CommunityDrawer from "../../components/Drawer/CommunityDrawer";
import { themeColors } from "../../variables/colors";

export default function Community() {
  return (
    <View style={styles.container}>
      <CommunityDrawer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: themeColors.primaryContainer },
});
