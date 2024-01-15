import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  Portal,
  Modal,
  Text,
  Divider,
  Dialog,
  ActivityIndicator,
  Chip,
} from "react-native-paper";

import { getList } from "../../services/address";

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export default function AreaPicker({ visible, onDismiss }: Props) {
  const [sidoList, setSidoList] = useState([]);
  const [selectedSido, setSelectedSido] = useState<string>("서울특별시");
  const [sigunguList, setSigunguList] = useState([]);
  const [sigunguDisplay, setSigunguDisplay] = useState([]);
  const [sigunguBySido, setSigunguBySido] = useState({});
  const [selectedSigungu, setSelectedSigungu] = useState<string[]>([]);

  const handleSidoPress = async (sido: { name: string; code: string }) => {
    setSelectedSido(sido.name);
    setSigunguDisplay(sigunguBySido[sido.name]);
  };

  const handleSigunguPress = (sigungu: string) => {
    let name = '';
    if (selectedSido === "세종특별자치시") {
      name = "세종특별자치시";
    } else {
      name = selectedSido + " " + sigungu;
    }
      if (selectedSigungu.includes(name)) {
        setSelectedSigungu(selectedSigungu.filter((item) => item !== name));
      } else {
        setSelectedSigungu([...selectedSigungu, name]);
      }
  };

  useEffect(() => {
    async function getData() {
      const response = await getList();
      setSidoList(response.data.sido);
      setSigunguList(response.data.sigungu);
      setSigunguBySido(response.data.sigungu_by_sido);
      setSigunguDisplay(response.data.sigungu_by_sido.서울특별시);
    }

    getData();
  }, []);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalItem}>
            <Text variant="headlineSmall">도/시</Text>
          </View>
          <View style={styles.modalItem}>
            <Text variant="headlineSmall">시/군/구</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.modalContent}>
          <ScrollView style={styles.modalScroll}>
            {sidoList.map((sido, index) => (
              <View
                key={index}
                style={
                  selectedSido === sido.name
                    ? styles.selectedTextBox
                    : styles.textBox
                }
              >
                <TouchableOpacity onPress={() => handleSidoPress(sido)}>
                  <Text
                    variant="titleLarge"
                    style={
                      selectedSido === sido.name
                        ? styles.selectedChoice
                        : styles.textChoices
                    }
                  >
                    {sido.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <ScrollView style={styles.modalScroll}>
            {sigunguDisplay.map((sigungu, index) => (
              <View
                key={index}
                style={
                  selectedSigungu.includes(
                    (selectedSido + " " + sigungu).trim()
                  ) ||
                  (selectedSido === "세종특별자치시" &&
                    selectedSigungu.includes(sigungu))
                    ? styles.selectedTextBox
                    : styles.textBox
                }
              >
                <TouchableOpacity onPress={() => handleSigunguPress(sigungu)}>
                  <Text
                    variant="titleLarge"
                    style={
                      selectedSigungu.includes(
                        (selectedSido + " " + sigungu).trim()
                      ) ||
                      (selectedSido === "세종특별자치시" &&
                        selectedSigungu.includes(sigungu))
                        ? styles.selectedChoice
                        : styles.textChoices
                    }
                  >
                    {sigungu}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.selectedList}>
          {selectedSigungu.map((sigungu, index) => (
            <Chip
              key={index}
              style={{ margin: 5 }}
              onClose={() =>
                setSelectedSigungu(
                  selectedSigungu.filter((item) => item !== sigungu)
                )
              }
            >
              {sigungu}
            </Chip>
          ))}
        </View>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
    height: 550,
  },
  modalContent: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },
  modalItem: {
    flex: 1,
    alignItems: "center",
    fontWeight: "bold",
  },
  modalScroll: {
    flex: 1,
    maxHeight: 400,
  },
  textBox: {
    paddingVertical: 10,
  },
  selectedTextBox: {
    backgroundColor: "lightgreen",
    borderRadius: 10,
    paddingVertical: 10,
  },
  textChoices: {
    textAlign: "center",
  },
  selectedChoice: {
    textAlign: "center",
    fontWeight: "bold",
  },
  selectedList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
