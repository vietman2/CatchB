import { ActivityIndicator } from "react-native-paper";

import { themeColors } from "../../../../variables/colors";

export function MyActivityIndicator() {
  return (
    <ActivityIndicator
      size={"large"}
      color={themeColors.primary}
      style={{ flex: 1, marginBottom: 30 }}
    />
  );
}
