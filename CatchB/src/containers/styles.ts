import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  information: {
    flex: 1,
    padding: 20,
    marginHorizontal: 2,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
  },
  basicInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  age: {
    fontSize: 20,
    color: "gray",
    fontFamily: "KBO Dia Gothic_bold",
  },
  rating: {
    flexDirection: "row",
  },
  ratingText: {
    fontSize: 16,
    color: "gray",
    fontFamily: "KBO Dia Gothic_bold",
  },
  firstLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    marginTop: 10,
    marginLeft: 15,
  },
});
