import { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Keyboard, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, MapMarker } from "react-native-maps";
import { Divider, Searchbar, Text } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";

import { CoachSimple } from "../fragments/CoachSimple";
import { FacilitySimple } from "../fragments/FacilitySimple";
import { ErrorPage } from ".components/Error";
import { LoadingPage } from ".components/Loading";
import { VerticalDivider } from ".components/Dividers";
import { ScrollView } from ".components/ScrollView";
import { NearbyScreenProps } from ".constants/navigation";
import { getCoachList, getFacilityList } from ".services/products";
import { AppDispatch, RootState } from ".store/index";
import { setSelectedCoach } from ".store/products/coachSlice";
import { setSelectedFacility } from ".store/products/facilitySlice";
import { themeColors } from ".themes/colors";
import { CoachSimpleType, FacilitySimpleType } from ".types/products";

const defaultRegion = {
  latitude: 37.5326,
  longitude: 127.024612,
};

export default function NearbyMain() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["3%", "70%"], []);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mode, setMode] = useState<"facility" | "coach">("facility");
  const [facilities, setFacilities] = useState<FacilitySimpleType[]>([]);
  const [coaches, setCoaches] = useState<CoachSimpleType[]>([]);
  const [region, setRegion] = useState(defaultRegion);
  const navigation =
    useNavigation<NearbyScreenProps<"NearbyScreen">["navigation"]>();
  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector((state: RootState) => state.general.location);

  const onFacilityPress = async (facility: FacilitySimpleType) => {
    await dispatch(setSelectedFacility(facility.uuid));
    navigation.navigate("FacilityDetail");
  };

  const onCoachPress = async (coach: CoachSimpleType) => {
    await dispatch(setSelectedCoach(coach.uuid));
    navigation.navigate("CoachDetail");
  };

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);

      const response1 = await getFacilityList();
      const response2 = await getCoachList();

      if (response1.status === 200 && response2.status === 200) {
        setFacilities(response1.data);
        setCoaches(response2.data);
        setError(false);
      } else {
        setError(true);
      }
    };

    fetchLists();

    setRegion(
      location
        ? {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
        : defaultRegion
    );

    setLoading(false);
  }, [refreshCount]);

  const Content = () => {
    if (error) {
      return <ErrorPage onRefresh={handleRefresh} />;
    }

    if (loading) {
      return <LoadingPage />;
    }

    return (
      <ScrollView refreshing={loading} onRefresh={handleRefresh}>
        {mode === "facility"
          ? facilities.map((facility) => (
              <View key={facility.uuid}>
                <TouchableOpacity onPress={() => onFacilityPress(facility)}>
                  <FacilitySimple facility={facility} />
                </TouchableOpacity>
                <Divider />
              </View>
            ))
          : coaches.map((coach) => (
              <View key={coach.uuid}>
                <TouchableOpacity onPress={() => onCoachPress(coach)}>
                  <CoachSimple coach={coach} />
                </TouchableOpacity>
                <Divider />
              </View>
            ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton
        showsCompass
        mapPadding={{ right: 0, bottom: 0, left: 0, top: 100 }}
        region={{ ...region, latitudeDelta: 0.009, longitudeDelta: 0.02 }}
        onPanDrag={Keyboard.dismiss}
        //onPress={() => bottomSheetRef.current.snapToIndex(0)}
      >
        {facilities.map((facility) => (
          <MapMarker
            key={facility.uuid}
            coordinate={{
              latitude: facility.latitude,
              longitude: facility.longitude,
            }}
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
        <Content />
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
