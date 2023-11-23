import { StyleSheet } from "react-native";

import { colors } from "../variables/colors"

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.whitebackground,
  },
  textButtonContainer: {
    marginTop: -10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInputContainer: {
    marginHorizontal: 50,
    justifyContent: "center",
  },
  buttonContainer: {
    marginHorizontal: 50,
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  loginButton: {
    borderRadius: 25,
    padding: 10,
    resizeMode: "contain",
    height: 50,
    width: 120,
  },
  divider: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxText: {
    fontSize: 15,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginHorizontal: 50,
    marginTop: 5,
  },
});
