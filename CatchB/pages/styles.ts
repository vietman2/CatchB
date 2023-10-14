import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  chatButton: {
    width: width / 2.5,
    height: 50,
    backgroundColor: "#e2f4e2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  chatText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    paddingLeft: 10,
  },
  image: {
    flex: 1,
    width: width,
    height: height / 2,
    resizeMode: "cover",
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

const cardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2f4e2",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginTop: 5,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  cards: {
    flexDirection: "row",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  description: {
    fontSize: 24,
    fontFamily: "KBO Dia Gothic_bold",
    marginTop: 4,
  },
  icon: {
    marginTop: 10,
  },
});

export { styles, cardStyles };
