import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Text } from "react-native-paper";

import { ReservationType } from ".types/products";
import { themeColors } from "../../../variables/colors";

interface Props {
  tab: string;
  reservations: ReservationType[];
}

type Tab = "신규" | "미확정인" | "취소된" | "완료된";

function NoReservations({ message }: Readonly<{ message: Tab }>) {
  return (
    <View style={styles.reservation}>
      <Text>{message} 예약이 없습니다.</Text>
    </View>
  );
}

export default function CheckReservations({
  tab,
  reservations,
}: Readonly<Props>) {
  const getMessage = () => {
    if (tab === "New") return "신규";
    if (tab === "Pending") return "미확정인";
    if (tab === "Cancelled") return "취소된";
    return "완료된";
  };

  const renderReservation = (reservation: ReservationType) => {
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
      {reservations.length === 0 && <NoReservations message={getMessage()} />}
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
