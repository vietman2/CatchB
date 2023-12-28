import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface textButtonProps {
  text: string;
  onPress: () => void;
}

export default function TextButton({ text, onPress }: textButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text variant="titleLarge" style={buttonStyles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  text: {
    padding: 10,
  },
});
