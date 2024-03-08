import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

interface Props {
  weekdayStart: string;
  setWeekdayStart: (input: string) => void;
  weekdayEnd: string;
  setWeekdayEnd: (input: string) => void;
  saturdayStart: string;
  setSaturdayStart: (input: string) => void;
  saturdayEnd: string;
  setSaturdayEnd: (input: string) => void;
  sundayStart: string;
  setSundayStart: (input: string) => void;
  sundayEnd: string;
  setSundayEnd: (input: string) => void;
}

export function WorkTimePickers({
  weekdayStart,
  setWeekdayStart,
  weekdayEnd,
  setWeekdayEnd,
  saturdayStart,
  setSaturdayStart,
  saturdayEnd,
  setSaturdayEnd,
  sundayStart,
  setSundayStart,
  sundayEnd,
  setSundayEnd,
}: Readonly<Props>) {
  const formatTime = (input: string) => {
    let cleanInput = input.replace(/\D/g, ""); // Remove non-numeric characters
    if (cleanInput.length > 4) cleanInput = cleanInput.slice(0, 4); // Limit length to 4 digits

    // Insert colon between hours and minutes
    if (cleanInput.length > 2) {
      cleanInput = `${cleanInput.slice(0, 2)}:${cleanInput.slice(2, 4)}`;
    }

    return cleanInput;
  };

  const handleWeekdayStart = (input: string) => {
    setWeekdayStart(formatTime(input));
  };

  const handleWeekdayEnd = (input: string) => {
    setWeekdayEnd(formatTime(input));
  };

  const handleSaturdayStart = (input: string) => {
    setSaturdayStart(formatTime(input));
  };

  const handleSaturdayEnd = (input: string) => {
    setSaturdayEnd(formatTime(input));
  };

  const handleSundayStart = (input: string) => {
    setSundayStart(formatTime(input));
  };

  const handleSundayEnd = (input: string) => {
    setSundayEnd(formatTime(input));
  };

  const commonProps = {
    dense: true,
    style: styles.timePickerBox,
    placeholderTextColor: "gray",
    outlineColor: "rgba(0, 128, 0, 0.8)",
    activeOutlineColor: "rgba(0, 128, 0, 0.8)",
    maxLength: 5,
  };

  return (
    <>
      <View style={styles.timeBox}>
        <Text style={styles.text}>평일</Text>
        <TextInput
          {...commonProps}
          placeholder="10:00"
          mode="outlined"
          inputMode="numeric"
          value={weekdayStart}
          onChangeText={handleWeekdayStart}
          testID="weekdayStart"
        />
        <Text>~</Text>
        <TextInput
          {...commonProps}
          placeholder="22:00"
          mode="outlined"
          inputMode="numeric"
          value={weekdayEnd}
          onChangeText={handleWeekdayEnd}
          testID="weekdayEnd"
        />
      </View>
      <View style={styles.timeBox}>
        <Text style={styles.text}>토요일</Text>
        <TextInput
          {...commonProps}
          placeholder="10:00"
          mode="outlined"
          inputMode="numeric"
          value={saturdayStart}
          onChangeText={handleSaturdayStart}
          testID="saturdayStart"
        />
        <Text>~</Text>
        <TextInput
          {...commonProps}
          placeholder="22:00"
          mode="outlined"
          inputMode="numeric"
          value={saturdayEnd}
          onChangeText={handleSaturdayEnd}
          testID="saturdayEnd"
        />
      </View>
      <View style={styles.timeBox}>
        <Text style={styles.text}>일요일</Text>
        <TextInput
          {...commonProps}
          placeholder="10:00"
          mode="outlined"
          inputMode="numeric"
          value={sundayStart}
          onChangeText={handleSundayStart}
          testID="sundayStart"
        />
        <Text>~</Text>
        <TextInput
          {...commonProps}
          placeholder="22:00"
          mode="outlined"
          inputMode="numeric"
          value={sundayEnd}
          onChangeText={handleSundayEnd}
          testID="sundayEnd"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  timeBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  timePickerBox: {
    flex: 3,
    marginHorizontal: 10,
    height: 35,
  },
  text: {
    flex: 1,
  },
});
