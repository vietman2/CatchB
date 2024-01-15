import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Text } from "react-native-paper";

import { Reservation } from "../../variables/types";
import { themeColors } from "../../variables/colors";

interface Props {
  tab: string;
  reservations: Reservation[];
}

export default function CheckReservations({ tab, reservations }: Props) {
  const NoReservations = () => {
    let message = "";
    if (tab === "New") {
      message = "신규";
    } else if (tab === "Pending") {
      message = "미확정인";
    } else if (tab === "Cancelled") {
      message = "취소된";
    } else if (tab === "Completed") {
      message = "완료된";
    } else {
      message = "";
    }

    return (
      <View style={styles.reservation}>
        <Text>{message} 예약이 없습니다.</Text>
      </View>
    );
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
            {reservation.created_at}
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

        <Divider style={styles.divider} />
        <View style={styles.buttons}>
          <TouchableOpacity>
            <Text>확정하기</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>취소하기</Text>
          </TouchableOpacity>
        </View>
        <Divider style={styles.divider} />
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    marginVertical: 10,
  },
});
