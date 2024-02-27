import { ScrollView, StyleSheet, View } from "react-native";

// TODO: Remove This Later
export function PlaceholderComponent({ color }: Readonly<{ color: string }>) {
  return (
    <View
      style={{
        flex: 1,
        height: 200,
        backgroundColor: color,
      }}
    />
  );
}

export function VideoList() {
  return (
    <ScrollView>
      <View style={styles.horizontal}>
        <PlaceholderComponent color="gray" />
        <PlaceholderComponent color="silver" />
        <PlaceholderComponent color="lightgray" />
      </View>
      <View style={styles.horizontal}>
        <PlaceholderComponent color="lemonchiffon" />
        <PlaceholderComponent color="ivory" />
        <PlaceholderComponent color="beige" />
      </View>
      <View style={styles.horizontal}>
        <PlaceholderComponent color="green" />
        <PlaceholderComponent color="lightgreen" />
        <PlaceholderComponent color="teal" />
      </View>
      <View style={styles.horizontal}>
        <PlaceholderComponent color="blue" />
        <PlaceholderComponent color="skyblue" />
        <PlaceholderComponent color="lightblue" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
  },
});
