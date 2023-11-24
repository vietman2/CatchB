import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "../variables/colors";

export default function SearchBar() {
  return (
    <View style={searchBoxStyles.container}>
      <View style={searchBoxStyles.searchArea}>
        <View style={searchBoxStyles.textBox}>
          <Text style={searchBoxStyles.text}>검색</Text>
        </View>
        <Ionicons
          style={searchBoxStyles.icon}
          name="search-outline"
          size={20}
          color={colors.icon}
        />
      </View>
      <View style={searchBoxStyles.space} />
    </View>
  );
}

const searchBoxStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.whitebackground,
    marginLeft: 10,
    marginTop: 5,
  },
  searchArea: {
    flex: 2,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: colors.primary,
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
    fontFamily: "KBO Dia Gothic_bold",
    color: colors.primary,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 5,
  },
});
