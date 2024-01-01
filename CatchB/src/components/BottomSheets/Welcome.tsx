import { useRef, useMemo } from "react";
import { Text } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";

export default function Welcome() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["3%", "25%"], []);

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
      <Text>Hi</Text>
    </BottomSheet>
  );
}
