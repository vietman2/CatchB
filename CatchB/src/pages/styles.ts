import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textButtonContainer: {
    marginTop: -10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInputContainer: {
    marginHorizontal: 50,
    alignItems: "stretch",
    justifyContent: "center",
  },
  buttonContainer: {
    marginHorizontal: 50,
    alignItems: "stretch",
    justifyContent: "center",
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginHorizontal: 50,
    marginTop: 5,
  },
});

export { styles };
