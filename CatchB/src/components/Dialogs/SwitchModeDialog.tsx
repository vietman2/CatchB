import { useState, useEffect } from "react";
import { Dialog, Portal, Text, Button } from "react-native-paper";

import { UserProfileType } from ".types/users";

interface Props {
  visible: boolean;
  currentMode: string;
  user: UserProfileType | null;
  onClose: () => void;
  setMode: (mode: "basic" | "pro") => void;
}

export default function SwitchModeDialog({
  visible,
  currentMode,
  user,
  onClose,
  setMode,
}: Readonly<Props>) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [possible, setPossible] = useState(false);

  useEffect(() => {
    if (currentMode === "basic") {
      setTitle("프로모드로 전환");
      if (user === null) {
        setContents("로그인이 필요합니다.");
      } else if (user.role !== "N") {
        setContents("프로모드로 전환하시겠습니까?");
        setPossible(true);
      } else {
        setContents("시설 관리자 혹은 코치만 프로모드를 사용할 수 있습니다.");
        setPossible(false);
      }
    }

    if (currentMode === "pro") {
      setTitle("일반모드로 전환");
      setContents("일반모드로 전환하시겠습니까?");
      setPossible(true);
    }
  }, [currentMode, user]);

  const handlePress = () => {
    if (possible) {
      setMode(currentMode === "basic" ? "pro" : "basic");
    } else {
      onClose();
    }
  };

  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="titleMedium">{contents}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>취소</Button>
          <Button onPress={handlePress}>확인</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
