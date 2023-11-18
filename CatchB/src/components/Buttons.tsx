import { useState } from "react";
import { Text, TouchableOpacity, Image, View, Switch } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { buttonStyles, toggleStyles } from "./styles";

interface loginButtonProps {
  text: string;
  onPress: () => void;
}

export const LoginButton = ({ text, onPress }: loginButtonProps) => {
  return (
    <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
      <Text style={buttonStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

interface portalLoginButtonProps {
  kakao: boolean;
  onPress: () => void;
}

export const PortalLoginButton = ({
  kakao,
  onPress,
}: portalLoginButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={
          kakao
            ? require("assets/images/kakao_login_large.png")
            : require("assets/images/btnG_축약형.png")
        }
        style={buttonStyles.portalButton}
        testID={kakao ? "kakaoButton" : "naverButton"}
      />
    </TouchableOpacity>
  );
};

interface textButtonProps {
  text: string;
  onPress: () => void;
}

export const TextButton = ({ text, onPress }: textButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles.textButton}>
      <Text style={buttonStyles.normalText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const ToggleButton = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const toggleSwitch = () => setIsLiked((previousState) => !previousState);

  return (
    <View style={toggleStyles.buttons}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={"#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isLiked}
      />
      <View style={toggleStyles.chatButton}>
        <Ionicons name="checkmark-done" size={20} color="green" />
        <Text style={toggleStyles.chatText}>1:1 채팅 상담</Text>
      </View>
    </View>
  );
}
