import { ScrollView, View, Dimensions } from "react-native";

export default function VideoList() {
  return (
    <ScrollView>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "gray",
            height: 200,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "silver",
            height: 200,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "brown",
            height: 200,
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "lemonchiffon",
            height: 200,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "ivory",
            height: 200,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "cornsilk",
            height: 200,
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "green",
            height: 200,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "lightgreen",
            height: 200,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "teal",
            height: 200,
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "blue",
            height: 200,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "skyblue",
            height: 200,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "lightblue",
            height: 200,
          }}
        />
      </View>
    </ScrollView>
  );
}
