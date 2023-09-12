import { useState } from "react";
import { View, Switch, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { styles } from "../styles";

export default function Buttons() {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const toggleSwitch = () => setIsLiked((previousState) => !previousState);

  return (
    <View style={styles.buttons}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isLiked}
      />
      <View style={styles.chatButton}>
        <Ionicons name="checkmark-done" size={20} color="green" />
        <Text style={styles.chatText}>1:1 채팅 상담</Text>
      </View>
    </View>
  );
}
