import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export function TimeBar() {
  const renderTime = (i: number) => {
    return i < 10 ? `0${i}:00` : `${i}:00`;
  };

  return (
    <ScrollView horizontal style={styles.container}>
      <View>
        <View style={styles.times}>
          {Array.from({ length: 48 }, (_, i) => (
            <View
              key={i}
              style={[i % 2 === 0 ? styles.viewBoxEven : styles.viewBoxOdd]}
            />
          ))}
        </View>
        <View style={styles.bars}>
          {Array.from({ length: 25 }, (_, i) => (
            <Text key={i} style={styles.textBox}>
              {renderTime(i)}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  viewBoxEven: {
    width: 30,
    height: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRightWidth: 0,
  },
  viewBoxOdd: {
    width: 30,
    height: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderLeftWidth: 0,
  },
  textBox: {
    width: 40,
    textAlign: "center",
    color: "gray",
    marginRight: 20,
  },
  times: {
    flexDirection: "row",
    marginLeft: 20,
  },
  bars: {
    flexDirection: "row",
  },
});
