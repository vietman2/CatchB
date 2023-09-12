import { ScrollView, Image } from "react-native";

import { styles } from "../styles";

export default function Images() {
  const renderImages = () => {
    const images = [];
    images.push(
      <Image
        key={1}
        style={styles.image}
        source={require("../../../../assets/images/LSY.jpg")}
      />
    );
    images.push(
      <Image
        key={2}
        style={styles.image}
        source={require("../../../../assets/images/LSY2.jpg")}
      />
    );
    images.push(
      <Image
        key={3}
        style={styles.image}
        source={require("../../../../assets/images/LSY3.jpg")}
      />
    );
    images.push(
      <Image
        key={4}
        style={styles.image}
        source={require("../../../../assets/images/LSY4.jpg")}
      />
    );

    return images;
  };

  return (
    <ScrollView style={styles.images} pagingEnabled horizontal>
      {renderImages()}
    </ScrollView>
  );
}
