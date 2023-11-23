import { View, StyleSheet } from "react-native";
import Postcode from "@actbase/react-daum-postcode";

export default function AddressSearch() {
  return (
    <View style={styles.container}>
      <Postcode
        style={styles.window}
        jsOptions={{ animation: true }}
        onSelected={(data) => console.log(data)}
        onError={(error) => alert(`에러가 발생했습니다. ${error}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  window: {
    width: "100%",
    height: "90%",
  },
});
