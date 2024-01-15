import { useRef, useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

interface Props {
  children: React.ReactNode;
}

export default function MapBottomSheet({ children }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["3%", "70%"], []);

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
      {children}
    </BottomSheet>
  );
}
