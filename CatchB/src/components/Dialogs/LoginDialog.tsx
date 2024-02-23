import { Dialog, Text, Button } from "react-native-paper";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function LoginDialog({ visible, onClose }: Readonly<Props>) {
  return (
    <Dialog visible={visible}>
      <Dialog.Title>세션 만료</Dialog.Title>
      <Dialog.Content>
        <Text>세션이 만료되었습니다. 다시 로그인해주세요.</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onClose}>확인</Button>
      </Dialog.Actions>
    </Dialog>
  );
}
