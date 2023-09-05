import { Text, TouchableOpacity, Image } from "react-native";

import { buttonStyles } from "./styles";

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
            ? require("../../../assets/images/kakao_login_large.png")
            : require("../../../assets/images/btnG_축약형.png")
        }
        style={buttonStyles.portalButton}
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
