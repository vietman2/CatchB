import { ScrollView, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Images() {
  const renderImages = () => {
    const images = [];
    images.push(
      <Image
        key={1}
        style={styles.image}
        source={require("assets/images/facility1.png")}
      />
    );
    images.push(
      <Image
        key={2}
        style={styles.image}
        source={require("assets/images/facility2.jpg")}
      />
    );
    images.push(
      <Image
        key={3}
        style={styles.image}
        source={require("assets/images/indoor1.jpg")}
      />
    );
    images.push(
      <Image
        key={4}
        style={styles.image}
        source={require("assets/images/indoor2.jpg")}
      />
    );

    return images;
  };

  return (
    <ScrollView style={{ flex: 1 }} pagingEnabled horizontal>
      {renderImages()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: width,
    height: height / 2,
    resizeMode: "cover",
  },
});
