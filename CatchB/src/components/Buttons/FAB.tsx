import { useState } from "react";
import { FAB } from "react-native-paper";

export default function FABGroup() {
  const [open, setOpen] = useState(false);

  const onStateChange = ({ open }: { open: boolean }) => setOpen(open);

  return (
    <FAB.Group
      open={open}
      icon="plus"
      actions={[
        {
          icon: "plus",
          label: "일정 추가",
          onPress: () => console.log("Pressed add"),
          testID: "add",
        },
        {
          icon: "calendar-today",
          label: "일정 보기",
          onPress: () => console.log("Pressed star"),
          testID: "view",
        },
      ]}
      onStateChange={onStateChange}
      visible={true}
      style={{ position: "absolute", bottom: -30, right: 0 }}
      testID="FABGroup"
    />
  );
}
