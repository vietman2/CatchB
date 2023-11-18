import { View, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { textInputStyles } from "./styles";

interface textInputProps {
  iconName?: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  secureTextEntry?: boolean;
}

export const MyTextInput = (props: textInputProps) => {
  return (
    <View style={textInputStyles.textInputField}>
      {props.iconName ? (
        <Ionicons
          name={props.iconName}
          size={24}
          color="black"
          style={textInputStyles.icon}
        />
      ) : null}

      <TextInput
        style={{ flex: 1 }}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        testID="textInput"
      />
    </View>
  );
};
