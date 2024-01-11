import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator, Divider, Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import NoPoints from "../../../components/PointsDetail/NoPoints";
import { themeColors } from "../../../variables/colors";
import { getPointsList } from "../../../services/point";
import { AppDispatch, RootState } from "../../../store/store";
import PointsDetail from "../../../components/PointsDetail/PointsDetail";
import { setPointsState } from "../../../store/slices/pointSlice";

export default function Points() {
  const [loading, setLoading] = useState(true);
  const total = useSelector((state: RootState) => state.point.totalPoints);
  const details = useSelector((state: RootState) => state.point.pointsDetails);
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();

  const formatTotal = () => {
    // format to 1,000,000 without using regex
    const totalString = total.toString();
    const totalLength = totalString.length;
    let formattedTotal = "";

    for (let i = 0; i < totalLength; i++) {
      formattedTotal += totalString[i];
      if ((totalLength - i - 1) % 3 === 0 && i !== totalLength - 1) {
        formattedTotal += ",";
      }
    }

    return formattedTotal;
  };

  useEffect(() => {
    const fetchPointsList = async () => {
      const response = await getPointsList(token, user.uuid);
      setLoading(false);
      dispatch(setPointsState(response.data));
    };
    fetchPointsList();
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.totalPoints}>
              <Text variant="titleLarge" style={styles.title}>
                보유포인트
              </Text>
              <Text variant="displaySmall" style={styles.total}>
                {formatTotal()}P
              </Text>
            </View>
            <View style={styles.upcomingExpire}>
              <Text variant="bodyLarge" style={styles.title}>
                15일 이내 소멸 예정 포인트
              </Text>
              <Text variant="bodyLarge" style={styles.title}>
                0P
              </Text>
            </View>
            <Divider />
            <View style={styles.details}>
              <Text variant="bodyLarge" style={styles.title}>
                포인트 적립 내역
              </Text>
            </View>
          </View>
          {total > 0 ? (
            <ScrollView style={styles.list}>
              {details.map((detail, index) => {
                return <PointsDetail key={index} detail={detail} />
              })}
            </ScrollView>
          ) : (
            <NoPoints />
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.primaryContainer,
  },
  totalPoints: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  total: {
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: "Catch B Bold",
    color: themeColors.primary,
  },
  upcomingExpire: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  details: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  list: {
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
  },
});
