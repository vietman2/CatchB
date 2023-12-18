import { View } from "react-native";
import MapView from "react-native-maps";

export default function Nearby() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MapView
        style={{ height: "100%", width: "100%" }}
        showsUserLocation={true}
        initialRegion={{
          latitude: 37.541,
          longitude: 126.986,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      </MapView>
    </View>
  );
}
