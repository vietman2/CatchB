import { Image, Text, View, StyleSheet } from "react-native";

interface Props {
  name: string;
  address: string;
  image_id: number;
}

export default function Facility({ name, address, image_id }: Props) {
  const renderImage = (image_id: number) => {
    if (image_id === 1) {
    }
    if (image_id === 2) {
    } else return <></>;
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {renderImage(image_id)}
      </View>
      <Text style={styles.facilityName}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  facilityName: {},
  address: {},
  image: {},
});
