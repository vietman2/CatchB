import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CoachInfoType } from "../../variables/types";

interface Props {
  coach: CoachInfoType;
}

export default function CoachSimple({ coach }: Props) {
  const renderImage = (image_id: number) => {
    if (image_id === 1) {
      return (
        <Image
          style={styles.image}
          source={require("../../assets/images/LSY.jpg")}
        />
      );
    } else if (image_id === 2) {
      return (
        <Image
          style={styles.image}
          source={require("../../assets/images/PCH.png")}
        />
      );
    } else if (image_id === 3) {
      return (
        <Image
          style={styles.image}
          source={require("../../assets/images/LDH.jpg")}
        />
      );
    } else return <></>;
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {renderImage(coach.id)}
      </View>
      <View style={styles.firstLine}>
        <Text style={styles.title}>{coach.name} 코치</Text>
        <Ionicons name="star" size={16} color="orange" />
        <Text style={styles.rating}>{coach.rating.toFixed(1)}</Text>
        <Text style={styles.reviewCount}> ({coach.num_reviews})</Text>
      </View>
      <Text style={styles.location}>{coach.location}</Text>
      <Text style={styles.price}>{formatPrice(coach.price)}원 / 1시간</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
