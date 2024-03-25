/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Keyboard, RefreshControl, ScrollView } from "react-native";

interface Props {
  children: React.ReactNode;
  refreshing: boolean;
  onRefresh: () => void;
}

export default function ScrollWithRefresh({
  children,
  refreshing,
  onRefresh,
}: Readonly<Props>) {
  const [isPulledDown, setIsPulledDown] = useState<boolean>(false);

  const onScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    if (scrollY < -100) {
      setIsPulledDown(true);
    } else {
      setIsPulledDown(false);
    }

    Keyboard.dismiss();
  };

  const onScrollEndDrag = () => {
    if (isPulledDown && !refreshing) {
      onRefresh();
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} />}
      onScroll={onScroll}
      onScrollEndDrag={onScrollEndDrag}
      scrollEventThrottle={16}
      testID="scroll-view"
    >
      {children}
    </ScrollView>
  );
}
