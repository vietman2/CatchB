import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MyArea() {
  return (
    <Modal animationType="slide" visible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>내 지역</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>서울특별시</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyText: {
    fontSize: 20,
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerButton: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 10,
  },
  footerButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
