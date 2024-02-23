import { IconButton } from "react-native-paper";

interface BackProps {
  onPress: () => void;
}

export default function BackButton({ onPress }: Readonly<BackProps>) {
  return <IconButton icon="arrow-left" onPress={onPress} testID="back" />;
}
