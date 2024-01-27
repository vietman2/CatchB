import { ScrollView, View } from "react-native";

export default function VideoList() {
  const PlaceholderView = ({ color }: { color: string }) => (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        height: 200,
      }}
    />
  );

  return (
    <ScrollView>
      <View style={{ flexDirection: "row" }}>
        <PlaceholderView color="gray" />
        <PlaceholderView color="silver" />
        <PlaceholderView color="lightgray" />
      </View>
      <View style={{ flexDirection: "row" }}>
        <PlaceholderView color="lemonchiffon" />
        <PlaceholderView color="ivory" />
        <PlaceholderView color="beige" />
      </View>
      <View style={{ flexDirection: "row" }}>
        <PlaceholderView color="green" />
        <PlaceholderView color="lightgreen" />
        <PlaceholderView color="teal" />
      </View>
      <View style={{ flexDirection: "row" }}>
        <PlaceholderView color="blue" />
        <PlaceholderView color="skyblue" />
        <PlaceholderView color="lightblue" />
      </View>
    </ScrollView>
  );
}
