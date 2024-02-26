import { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, MapMarker } from "react-native-maps";
import { Divider, Searchbar, Text } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";

import { CoachSimple } from "../CoachDetail/CoachSimple";
import { FacilitySimple } from "../FacilityDetail/FacilitySimple";
import { VerticalDivider } from "../../../components/Dividers";
import { sampleFacilities } from "../../../variables/mvp_dummy_data/facilities";
import { sampleCoaches } from "../../../variables/mvp_dummy_data/coaches";
import { CoachType, FacilityType } from "../../../variables/types/products";
import { NearbyStackScreenProps } from "../../../variables/navigation";
import { themeColors } from "../../../variables/colors";
import { AppDispatch, RootState } from "../../../store/store";
import { setSelectedFacility } from "../../../store/slices/products/facilitySlice";
import { setSelectedCoach } from "../../../store/slices/products/coachSlice";

export default function NearbyMain() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["3%", "70%"], []);
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState<"facility" | "coach">("facility");
  const [facilities, setFacilities] = useState<FacilityType[]>([]);
  const [coaches, setCoaches] = useState<CoachType[]>([]);
  const [region, setRegion] = useState({
    latitude: 37.5326,
    longitude: 127.024612,
    latitudeDelta: 0.009,
    longitudeDelta: 0.02,
  });
  const navigation =
    useNavigation<NearbyStackScreenProps<"NearbyScreen">["navigation"]>();
  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector((state: RootState) => state.general.location);

  const onFacilityPress = async (facility: FacilityType) => {
    await dispatch(setSelectedFacility(facility));
    navigation.navigate("FacilityDetail");
  };

  const onCoachPress = async (coach: CoachType) => {
    await dispatch(setSelectedCoach(coach));
    navigation.navigate("CoachDetail");
  };

  useEffect(() => {
    setFacilities(sampleFacilities);
    setCoaches(sampleCoaches);

    setRegion({
      latitude: location ? location.coords.latitude : 37.5326,
      longitude: location ? location.coords.longitude : 127.024612,
      latitudeDelta: 0.009,
      longitudeDelta: 0.02,
    });
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
        //onPress={() => bottomSheetRef.current.snapToIndex(0)}
      >
        {facilities.map((facility) => (
          <MapMarker
            key={facility.id}
            coordinate={{
              latitude: facility.position.lat,
              longitude: facility.position.lng,
            }}
            title={facility.name}
            description={facility.description}
          />
        ))}
      </MapView>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setMode("facility")}
          >
            <Text
              variant="titleLarge"
              style={mode === "facility" ? styles.selectedText : styles.text}
            >
              시설
            </Text>
          </TouchableOpacity>
          <VerticalDivider />
          <TouchableOpacity style={styles.tab} onPress={() => setMode("coach")}>
            <Text
              variant="titleLarge"
              style={mode === "coach" ? styles.selectedText : styles.text}
            >
              코치
            </Text>
          </TouchableOpacity>
        </View>
        <Divider style={styles.divider} />
        <ScrollView>
          {mode === "facility"
            ? facilities.map((facility) => (
                <View key={facility.id}>
                  <TouchableOpacity onPress={() => onFacilityPress(facility)}>
                    <FacilitySimple facility={facility} />
                  </TouchableOpacity>
                  <Divider />
                </View>
              ))
            : coaches.map((coach) => (
                <View key={coach.id}>
                  <TouchableOpacity onPress={() => onCoachPress(coach)}>
                    <CoachSimple coach={coach} />
                  </TouchableOpacity>
                  <Divider />
                </View>
              ))}
        </ScrollView>
      </BottomSheet>
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
  filters: {
    position: "absolute",
    bottom: "15.5%",
    left: 20,
    borderColor: themeColors.primary,
    borderWidth: 1,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    paddingBottom: 3,
  },
  selectedText: {
    color: themeColors.primary,
    fontWeight: "bold",
    paddingBottom: 3,
  },
  divider: {
    marginHorizontal: 10,
    marginTop: 5,
  },
});
