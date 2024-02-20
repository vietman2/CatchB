import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

interface Props {
  weekdayStart: string;
  weekdayEnd: string;
  saturdayStart: string;
  saturdayEnd: string;
  sundayStart: string;
  sundayEnd: string;
  setWeekdayStart: Dispatch<SetStateAction<string>>;
  setWeekdayEnd: Dispatch<SetStateAction<string>>;
  setSaturdayStart: Dispatch<SetStateAction<string>>;
  setSaturdayEnd: Dispatch<SetStateAction<string>>;
  setSundayStart: Dispatch<SetStateAction<string>>;
  setSundayEnd: Dispatch<SetStateAction<string>>;
}

export default function WorkTimePickers(props: Readonly<Props>) {
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
    props.setWeekdayStart(formatTime(input));
  };

  const handleWeekdayEnd = (input: string) => {
    props.setWeekdayEnd(formatTime(input));
  };

  const handleSaturdayStart = (input: string) => {
    props.setSaturdayStart(formatTime(input));
  };

  const handleSaturdayEnd = (input: string) => {
    props.setSaturdayEnd(formatTime(input));
  };

  const handleSundayStart = (input: string) => {
    props.setSundayStart(formatTime(input));
  };

  const handleSundayEnd = (input: string) => {
    props.setSundayEnd(formatTime(input));
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
          outlineColor="rgba(0, 128, 0, 0.8)"
          activeOutlineColor="rgba(0, 128, 0, 0.8)"
          inputMode="numeric"
          value={props.weekdayStart}
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
          outlineColor="rgba(0, 128, 0, 0.8)"
          activeOutlineColor="rgba(0, 128, 0, 0.8)"
          inputMode="numeric"
          value={props.weekdayEnd}
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
          outlineColor="rgba(0, 128, 0, 0.8)"
          activeOutlineColor="rgba(0, 128, 0, 0.8)"
          inputMode="numeric"
          value={props.saturdayStart}
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
          outlineColor="rgba(0, 128, 0, 0.8)"
          activeOutlineColor="rgba(0, 128, 0, 0.8)"
          inputMode="numeric"
          value={props.saturdayEnd}
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
          outlineColor="rgba(0, 128, 0, 0.8)"
          activeOutlineColor="rgba(0, 128, 0, 0.8)"
          inputMode="numeric"
          value={props.sundayStart}
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
          outlineColor="rgba(0, 128, 0, 0.8)"
          activeOutlineColor="rgba(0, 128, 0, 0.8)"
          inputMode="numeric"
          value={props.sundayEnd}
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
