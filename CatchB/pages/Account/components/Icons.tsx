import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  onPress: () => void;
  name: string;
  text: string;
}

export const IconText = ({ onPress, name, text }: Props) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
      }}
      onPress={onPress}
    >
      <Ionicons name={name} size={20} color="black" />
      <Text style={{ marginBottom: 5 }}>{text}</Text>
    </TouchableOpacity>
  );
}

export const LoginLogo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>W E L C O M E</Text>
      <Image
        source={require("../../../assets/images/logo_font_bottom_white.png")}
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

