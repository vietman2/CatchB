import { StyleProp, ViewStyle } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { themeColors } from ".themes/colors";

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function LoadingComponent({ style }: Readonly<Props>) {
  return <ActivityIndicator animating={true} color={themeColors.primary} style={style} />;
}
