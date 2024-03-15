import { StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

import { themeColors } from ".themes/colors";

interface ImageProps {
  profileImage?: string;
}

export function AvatarIcon({ profileImage }: Readonly<ImageProps>) {
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
  detailsLine: {
    flexDirection: "row",
    marginTop: 5,
  },
});
