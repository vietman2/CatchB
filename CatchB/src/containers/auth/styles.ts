import { StyleSheet } from "react-native";

import { themeColors } from "../../variables/colors";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
  },
  container: {
    marginHorizontal: 50,
    justifyContent: "center",
  },
  textButtonContainer: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    color: themeColors.error,
    marginHorizontal: 50,
    marginTop: 5,
  },
  registerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
