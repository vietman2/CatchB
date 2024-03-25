import { useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, Text } from "react-native-paper";

import { themeColors } from ".themes/colors";

const { width } = Dimensions.get("window");

interface Props {
  mode: "like" | "dislike" | "report";
  number?: number;
  state?: boolean;
  action?: () => void;
}

export function CommunityButton({ mode, number, state, action }: Readonly<Props>) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const animateScale = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onPress = () => {
    action();
    animateScale();
  };

  const renderIcon = () => {
    switch (mode) {
      case "like":
        return state ? "heart" : "heart-outline";
      case "dislike":
        return state ? "emoticon-cry" : "emoticon-cry-outline";
      case "report":
        return "flag";
    }
  };

  const renderText = () => {
    switch (mode) {
      case "like":
        return "좋아요";
      case "dislike":
        return "싫어요";
      case "report":
        return "신고하기";
    }
  };

  return (
    <TouchableOpacity onPress={onPress} testID="community-button">
      <Animated.View
        style={[styles.button, { transform: [{ scale: scaleValue }] }]}
      >
        <Icon source={renderIcon()} size={24} color={themeColors.primary} />
        {number >= 0 ? <Text style={styles.number}>{number}</Text> : <View style={styles.placeholder} />}
        <Text style={styles.text}>{renderText()}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: (width - 60) / 3 - 30,
    padding: 10,
    backgroundColor: themeColors.secondaryContainer,
  },
  number: {
    fontFamily: "Catch B Bold",
    fontSize: 16,
  },
  text: {
    marginVertical: 5,
    textAlign: "center",
  },
  placeholder: {
    height: 18.5,
  }
});
