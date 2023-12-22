import { View, StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";

import { Reservation } from "../../variables/types";
import { themeColors } from "../../variables/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  tab: string;
  reservations: Reservation[];
}

export default function CheckReservations({ tab, reservations }: Props) {
  const NoReservations = () => {
    let message = "";
    if (tab === "New") {
      message = "신규";
    }
    if (tab === "Pending") {
      message = "미확정인";
    }
    if (tab === "Cancelled") {
      message = "취소된";
    }
    if (tab === "Completed") {
      message = "완료된";
    }

    return (
      <View style={styles.reservation}>
        <Text>{message} 예약이 없습니다.</Text>
      </View>
    );
  };

  const getElapsedTime = (datetime: string) => {
    const now = new Date();
    const datetimeObject = new Date(datetime);
    const elapsedMilliseconds = now.getTime() - datetimeObject.getTime();
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);

    if (elapsedDays > 0) {
      return `${elapsedDays}일 전`;
    }
    if (elapsedHours > 0) {
      return `${elapsedHours}시간 전`;
    }
    if (elapsedMinutes > 0) {
      return `${elapsedMinutes}분 전`;
    }
    if (elapsedSeconds > 0) {
      return `${elapsedSeconds}초 전`;
    }
    return "방금 전";
  };

  const renderReservation = (reservation: Reservation) => {
    return (
      <View style={styles.reservation} key={reservation.uuid}>
        <View style={styles.line}>
          <Text>
            <Text variant="titleMedium" style={styles.bold}>
              {reservation.reserved_user}
            </Text>
            {"\t\t"}
            {getElapsedTime(reservation.created_at)}
          </Text>
        </View>
        <View style={styles.line}>
          <Text>
            Catch B 레슨장{" "}
            {reservation.lesson_session ? reservation.lesson_session : ""}
          </Text>
        </View>
        <Text>
          {reservation.start_datetime} ~ {reservation.end_datetime}
        </Text>

        <Divider />
        <View style={styles.line}>
          <TouchableOpacity>
            <Text>확정하기</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>취소하기</Text>
          </TouchableOpacity>
        </View>
        <Divider />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {reservations.length === 0 && <NoReservations />}
      {reservations.map((reservation) => renderReservation(reservation))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 15,
    backgroundColor: themeColors.primaryContainer,
  },
  reservation: {
    marginTop: 15,
  },
  line: {
    flexDirection: "row",
    marginTop: 5,
  },
  bold: {
    fontWeight: "bold",
  },
});
