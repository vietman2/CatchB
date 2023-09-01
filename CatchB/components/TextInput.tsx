import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface textInputProps {
  iconName?: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  secureTextEntry?: boolean;
}

export const MyTextInput = (props: textInputProps) => {
  return (
    <View style={styles.textInputField}>
      {props.iconName ? (
        <Ionicons
          name={props.iconName}
          size={24}
          color="black"
          style={styles.icon}
        />
      ) : null}

      <TextInput
        style={{ flex: 1 }}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputField: {
    flexDirection: "row",
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10,
  },
});
