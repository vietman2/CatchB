import { Text, View, StyleSheet, Image } from "react-native";
import { FacilityInfoType } from "../../variables/types";

interface Props {
  facility: FacilityInfoType;
}

export default function Facility({ facility }: Props) {
  const renderImage = (image_id: number) => {
    if (image_id === 1) {
      return (
        <Image
          style={styles.image}
          source={require("../../assets/images/facility1.png")}
        />
      );
    } else if (image_id === 2) {
      return (
        <Image
          style={styles.image}
          source={require("../../assets/images/facility2.jpg")}
        />
      );
    } else return <></>;
  };

  return (
    <View style={styles.container}>
      {renderImage(facility.id)}
      <View style={styles.textBox}>
        <Text style={styles.facilityName}>{facility.name}</Text>
        <Text style={styles.address}>{facility.address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  facilityName: {
    fontSize: 20,
    fontFamily: "KBO Dia Gothic_medium",
  },
  address: {
    fontSize: 15,
    color: "gray",
    fontFamily: "KBO Dia Gothic_medium",
  },
  image: {
    width: 200,
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginLeft: 10,
  },
  textBox: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
});
