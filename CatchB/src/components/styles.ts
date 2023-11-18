import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const coachStyles = StyleSheet.create({
  container: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  title: {
    fontSize: 20,
    fontFamily: "KBO Dia Gothic_bold",
    paddingLeft: 5,
    marginRight: 15,
  },
  location: {
    fontSize: 15,
    fontFamily: "KBO Dia Gothic_bold",
    color: "gray",
    paddingLeft: 5,
  },
  firstLine: {
    flexDirection: "row",
    marginTop: 5,
  },
  rating: {
    fontSize: 20,
    fontFamily: "KBO Dia Gothic_bold",
  },
  reviewCount: {
    fontSize: 20,
    fontFamily: "KBO Dia Gothic_bold",
    color: "gray",
  },
  price: {
    fontSize: 20,
    fontFamily: "KBO Dia Gothic_bold",
    paddingLeft: 5,
    marginTop: 5,
  },
});

export const headingStyles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 15,
    borderColor: "green",
    borderWidth: 3,
    borderRadius: 20,
  },
  subContainer: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
  },
  mainHeading: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 3,
    fontFamily: "KBO Dia Gothic_bold",
    color: "green",
  },
  subHeading: {
    fontFamily: "KBO Dia Gothic_bold",
    fontSize: 14,
    color: "gray",
  },
});

export const facilityStyles = StyleSheet.create({
  recentContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
  },
  boldText: {
    fontSize: 15,
    fontFamily: "KBO Dia Gothic_bold",
  },
  container: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: "KBO Dia Gothic_medium",
  },
  address: {
    fontSize: 15,
    color: "gray",
    fontFamily: "KBO Dia Gothic_medium",
  },
  imageLarge: {
    width: 200,
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginLeft: 10,
  },
  imageSmall: {
    width: 120,
    height: 60,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 10,
    borderRadius: 40,
  },
  textBox: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  button: {
    height: 60,
    width: 60,
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
});

export const buttonStyles = StyleSheet.create({
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

export const textInputStyles = StyleSheet.create({
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

export const toggleStyles = StyleSheet.create({
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
});

export const cardStyles = StyleSheet.create({
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

export const searchBoxStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginLeft: 10,
    marginTop: 5,
  },
  searchArea: {
    flex: 2,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "green",
    borderEndWidth: 3,
    borderBottomWidth: 3,
    borderWidth: 1,
  },
  space: {
    flex: 3,
  },
  textBox: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
  },
  text: {
    fontSize: 20,
    justifyContent: "center",
    fontFamily: "KBO Dia Gothic_bold",
    color: "green",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 5,
  },
});

export const itemStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textBox: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 20,
  },
  title: {
    marginTop: 4,
    fontSize: 16,
    padding: 6,
    fontFamily: "KBO Dia Gothic_bold",
  },
  hashtags: {
    fontSize: 12,
    padding: 6,
    fontFamily: "KBO Dia Gothic_bold",
    marginBottom: 4,
  },
  image: {
    width: 180,
    height: 240,
    resizeMode: "cover",
    borderRadius: 20,
  },
  moreInfo: {
    fontSize: 12,
    padding: 6,
    fontFamily: "KBO Dia Gothic_bold",
    marginBottom: 4,
    color: "gray",
  },
});