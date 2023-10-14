import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { facilities } from "../../variables/dummydata";

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
        <Marker
          title={facilities[0].name}
          coordinate={{
            latitude: facilities[0].location.latitude,
            longitude: facilities[0].location.longitude,
          }}
        />
        <Marker
          title={facilities[1].name}
          coordinate={{
            latitude: facilities[1].location.latitude,
            longitude: facilities[1].location.longitude,
          }}
        />
        <Marker
          title={facilities[2].name}
          coordinate={{
            latitude: facilities[2].location.latitude,
            longitude: facilities[2].location.longitude,
          }}
        />
        <Marker
          title={facilities[3].name}
          coordinate={{
            latitude: facilities[3].location.latitude,
            longitude: facilities[3].location.longitude,
          }}
        />
      </MapView>
    </View>
  );
}
