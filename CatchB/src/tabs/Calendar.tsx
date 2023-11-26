import { View } from 'react-native';
import { Calendar as CalendarComponent } from 'react-native-calendars';
import { Text } from 'react-native-paper';

export default function Calendar() {
  return (
    <>
      <CalendarComponent />
      <View style={{ padding: 15 }}>
        <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>내 예약 목록</Text>
      </View>
    </>
  );
}
