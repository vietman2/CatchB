import { Text, View, StyleSheet, Image } from "react-native";

export const LoginLogo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>W E L C O M E</Text>
      <Image
        source={require("assets/images/logo_font_bottom_white.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
