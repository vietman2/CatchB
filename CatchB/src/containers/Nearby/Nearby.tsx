import { useEffect, useState } from "react";
import { View, StyleSheet, Keyboard, ScrollView, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Divider, Searchbar } from "react-native-paper";
import { getCurrentPositionAsync } from "expo-location";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import FacilitySimple from "./FacilityDetail/FacilitySimple";
import MapBottomSheet from "../../components/BottomSheets/MapBottomSheet";
import { sampleFacilities } from "../../variables/mvp_dummy_data/facilities";
import { FacilityType } from "../../variables/types";
import { NearbyStackScreenProps } from "../../variables/navigation";
import { AppDispatch } from "../../store/store";
import { setSelectedFacility } from "../../store/slices/facilitySlice";

export default function Nearby() {
  const [searchQuery, setSearchQuery] = useState("");
  const [facilities, setFacilities] =
    useState<FacilityType[]>(sampleFacilities);
  const [region, setRegion] = useState({
    latitude: 37.541,
    longitude: 126.986,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const navigation = useNavigation<NearbyStackScreenProps<"NearbyScreen">["navigation"]>();
  const dispatch = useDispatch<AppDispatch>();

  const getLocation = async () => {
    const { coords } = await getCurrentPositionAsync();
    setRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const onFacilityPress = async (facility: FacilityType) => {
    await dispatch(setSelectedFacility(facility));
    navigation.navigate("FacilityDetail");
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton
        showsCompass
        mapPadding={{ right: 0, bottom: 0, left: 0, top: 100 }}
        region={region}
        onPanDrag={Keyboard.dismiss}
      ></MapView>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />
      <MapBottomSheet>
        <ScrollView>
          {facilities.map((facility, index) => (
            <View key={index}>
              <TouchableOpacity onPress={() => onFacilityPress(facility)}>
                <FacilitySimple facility={facility} />
              </TouchableOpacity>
              <Divider />
            </View>
          ))}
        </ScrollView>
      </MapBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    height: "97%",
    width: "100%",
  },
  search: {
    position: "absolute",
    top: 55,
    width: "90%",
    backgroundColor: "white",
  },
});
