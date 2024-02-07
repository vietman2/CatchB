import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

export default function WorkTimePickers() {
  const [weekdayStart, setWeekdayStart] = useState<string>("");
  const [weekdayEnd, setWeekdayEnd] = useState<string>("");
  const [saturdayStart, setSaturdayStart] = useState<string>("");
  const [saturdayEnd, setSaturdayEnd] = useState<string>("");
  const [sundayStart, setSundayStart] = useState<string>("");
  const [sundayEnd, setSundayEnd] = useState<string>("");

  const formatTime = (input: string) => {
    let cleanInput = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters
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

  return (
    <>
      <View style={styles.timeBox}>
        <Text style={{ flex: 1 }}>평일</Text>
        <TextInput
          placeholder="10:00"
          dense
          mode="outlined"
          style={styles.timePickerBox}
          placeholderTextColor="gray"
          inputMode="numeric"
          value={weekdayStart}
          onChangeText={handleWeekdayStart}
          maxLength={5}
          testID="weekdayStart"
        />
        <Text>~</Text>
        <TextInput
          placeholder="22:00"
          dense
          mode="outlined"
          style={styles.timePickerBox}
          placeholderTextColor="gray"
          inputMode="numeric"
          value={weekdayEnd}
          onChangeText={handleWeekdayEnd}
          maxLength={5}
          testID="weekdayEnd"
        />
      </View>
      <View style={styles.timeBox}>
        <Text style={{ flex: 1 }}>토요일</Text>
        <TextInput
          placeholder="10:00"
          dense
          mode="outlined"
          style={styles.timePickerBox}
          placeholderTextColor="gray"
          inputMode="numeric"
          value={saturdayStart}
          onChangeText={handleSaturdayStart}
          maxLength={5}
          testID="saturdayStart"
        />
        <Text>~</Text>
        <TextInput
          placeholder="22:00"
          dense
          mode="outlined"
          style={styles.timePickerBox}
          placeholderTextColor="gray"
          inputMode="numeric"
          value={saturdayEnd}
          onChangeText={handleSaturdayEnd}
          maxLength={5}
          testID="saturdayEnd"
        />
      </View>
      <View style={styles.timeBox}>
        <Text style={{ flex: 1 }}>일요일</Text>
        <TextInput
          placeholder="10:00"
          dense
          mode="outlined"
          style={styles.timePickerBox}
          placeholderTextColor="gray"
          inputMode="numeric"
          value={sundayStart}
          onChangeText={handleSundayStart}
          maxLength={5}
          testID="sundayStart"
        />
        <Text>~</Text>
        <TextInput
          placeholder="22:00"
          dense
          mode="outlined"
          style={styles.timePickerBox}
          placeholderTextColor="gray"
          inputMode="numeric"
          value={sundayEnd}
          onChangeText={handleSundayEnd}
          maxLength={5}
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
});
