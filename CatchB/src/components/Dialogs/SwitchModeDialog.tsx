import { useState, useEffect } from "react";
import { Dialog, Portal, Text, Button } from "react-native-paper";
import { UserProfile } from "../../variables/types";

interface Props {
  visible: boolean;
  currentMode: string;
  user: UserProfile | null;
  onClose: () => void;
  setMode: (mode: "basic" | "pro") => void;
}

export default function SwitchModeDialog({
  visible,
  currentMode,
  user,
  onClose,
  setMode,
}: Props) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [possible, setPossible] = useState(false);

  useEffect(() => {
    if (currentMode === "basic") {
      setTitle("프로모드로 전환");
      if (user === null) {
        setContents("로그인이 필요합니다.");
      }
      else if (user.user_type !== "normal_user") {
        setContents("프로모드로 전환합니다.");
        setPossible(true);
      }
      else {
        setContents("시설 관리자 혹은 코치만 프로모드를 사용할 수 있습니다.");
        setPossible(false);
      }
    }

    if (currentMode === "pro") {
      setTitle("일반모드로 전환");
      setContents("일반모드로 전환합니다.");
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
          <Text>{contents}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handlePress}>확인</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
