import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  images: {
    flex: 1,
    backgroundColor: "red",
  },
  information: {
    flex: 1,
    backgroundColor: "blue",
  },
  basicInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  age: {
    fontSize: 20,
    color: "gray",
  },
  rating: {
    flexDirection: "row",
  },
  ratingText: {
    fontSize: 20,
    color: "gray",
  },
  detailInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  firstLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 20,
  },
  cards: {
    flexDirection: "row",
    marginTop: 10,
  },
});

const cardStyles = StyleSheet.create({
  container: {},
  title: {},
  description: {},
  icon: {},
});

export { styles, cardStyles };
