import { ScrollView, StyleSheet, View } from "react-native";

export default function VideoList() {
  const PlaceholderView = ({ color }: { color: string }) => (
    <View style={[styles.placeholder, { backgroundColor: color }]} />
  );

  return (
    <ScrollView>
      <View style={styles.horizontal}>
        <PlaceholderView color="gray" />
        <PlaceholderView color="silver" />
        <PlaceholderView color="lightgray" />
      </View>
      <View style={styles.horizontal}>
        <PlaceholderView color="lemonchiffon" />
        <PlaceholderView color="ivory" />
        <PlaceholderView color="beige" />
      </View>
      <View style={styles.horizontal}>
        <PlaceholderView color="green" />
        <PlaceholderView color="lightgreen" />
        <PlaceholderView color="teal" />
      </View>
      <View style={styles.horizontal}>
        <PlaceholderView color="blue" />
        <PlaceholderView color="skyblue" />
        <PlaceholderView color="lightblue" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
  },
  placeholder: {
    flex: 1,
    height: 200,
  },
});
