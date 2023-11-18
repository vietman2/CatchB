import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { searchBoxStyles } from "./styles";

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
          color="black"
        />
      </View>
      <View style={searchBoxStyles.space} />
    </View>
  );
}
