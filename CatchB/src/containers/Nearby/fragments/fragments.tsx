import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

import { themeColors } from ".themes/colors";
import { TouchableOpacity } from "react-native";

interface TitleProps {
  title: string;
  is_coach?: boolean;
}

export function TitleText({ title, is_coach }: TitleProps) {
  return (
    <Text variant="headlineMedium" style={styles.title}>
      {`${title}${is_coach ? " 코치" : ""}`}
    </Text>
  );
}

interface StatsProps {
  rating: number;
  like: boolean;
  setLike: (like: boolean) => void;
}

export function Stats({ rating, like, setLike }: StatsProps) {
  return (
    <>
      <View style={styles.rating}>
        <Icon source="star" size={20} color="gold" />
        <Text>{rating}/10</Text>
      </View>
      <View style={styles.interactions}>
        <TouchableOpacity onPress={() => setLike(!like)} testID="like">
          <Icon
            source={like ? "heart" : "heart-outline"}
            size={20}
            color={themeColors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icon source="share-outline" size={20} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 5,
    fontFamily: "Catch B ExtraBold",
    color: themeColors.primary,
  },
  rating: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  interactions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
