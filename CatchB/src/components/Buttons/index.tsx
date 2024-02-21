import { IconButton } from "react-native-paper";

interface Props {
  onPress: () => void;
}

export function BackButton({ onPress }: Readonly<Props>) {
  return <IconButton icon="arrow-left" onPress={onPress} testID="back" />;
}
