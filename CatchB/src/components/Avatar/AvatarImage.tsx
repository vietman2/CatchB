import { StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

import { themeColors } from "../../variables/colors";

interface Props {
  profileImage?: string;
}

export default function AvatarImage({ profileImage }: Readonly<Props>) {
  if (profileImage) {
    return (
      <Avatar.Image
        size={64}
        source={{ uri: profileImage }}
        style={styles.avatar}
      />
    );
  }
  return <Avatar.Icon size={64} icon="account" style={styles.avatar} />;
}

const styles = StyleSheet.create({
  avatar: {
    marginVertical: 16,
    backgroundColor: themeColors.secondaryContainer,
  },
});
