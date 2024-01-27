import { View, TouchableOpacity } from "react-native";
import { Text, Icon, Chip } from "react-native-paper";

interface Props {
  text: string;
  openMenu: () => void;
}

export default function MenuWithIcon({ text, openMenu }: Props) {
  return (
    <TouchableOpacity onPress={openMenu} style={{ marginRight: 5 }}>
      <View style={{ flexDirection: "row" }}>
        <Chip compact>
          <Text variant="titleSmall">{text}</Text>
          <Icon source="chevron-down" size={16} />
        </Chip>
      </View>
    </TouchableOpacity>
  );
}
