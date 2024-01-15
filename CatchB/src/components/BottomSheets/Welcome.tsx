import { useRef, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";

interface Props {
  text: string;
}

export default function Welcome({ text }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["3%", "50%"], []);

  return (
    <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} style={styles.container}>
      <Text variant="displaySmall">{text}</Text>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
