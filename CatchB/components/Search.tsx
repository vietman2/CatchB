import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Search() {
  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <View style={styles.textBox}>
          <Text style={styles.text}>검색</Text>
        </View>
        <Ionicons
          style={styles.icon}
          name="search-outline"
          size={20}
          color="black"
        />
      </View>

      <View style={styles.space} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginLeft: 10,
    marginTop: 5,
  },
  searchArea: {
    flex: 2,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "green",
    borderEndWidth: 3,
    borderBottomWidth: 3,
    borderWidth: 1,
  },
  space: {
    flex: 3,
  },
  textBox: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
  },
  text: {
    fontSize: 20,
    justifyContent: "center",
    color: "green",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 5,
  },
});
