import { StyleSheet } from "react-native";

const containerStyles = StyleSheet.create({
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
});

export { containerStyles };
