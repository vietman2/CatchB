import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: "gray",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  portalButton: {
    borderRadius: 25,
    padding: 10,
    resizeMode: "contain",
    height: 50,
    width: 120,
  },
  textButton: {
    marginTop: 10,
  },
  normalText: {
    fontSize: 15,
    fontWeight: "normal",
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

const textInputStyles = StyleSheet.create({
  textInputField: {
    flexDirection: "row",
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10,
  },
});

export { buttonStyles, textInputStyles };
