import { Dialog, Portal, Text, Button } from "react-native-paper";

interface Props {
    visible: boolean;
    title: string;
    contents: string;
    onClose: () => void;
}

export default function LoginDialog({ visible, title, contents, onClose }: Props) {
    return (
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text>{contents}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onClose}>확인</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
}