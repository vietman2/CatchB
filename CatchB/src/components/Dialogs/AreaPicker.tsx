import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Portal,
  Text,
  Divider,
  Dialog,
  Chip,
  Button,
} from "react-native-paper";

import { getList } from "../../services/address";
import { themeColors } from "../../variables/colors";

interface Props {
  visible: boolean;
  onDismiss: () => void;
  setSelectedAreas: (selectedSigungu: string[]) => void;
}

export default function AreaPicker({
  visible,
  onDismiss,
  setSelectedAreas,
}: Readonly<Props>) {
  const [sidoList, setSidoList] = useState([]);
  const [selectedSido, setSelectedSido] = useState<string>("서울특별시");
  const [sigunguDisplay, setSigunguDisplay] = useState([]);
  const [sigunguBySido, setSigunguBySido] = useState({});
  const [selectedSigungu, setSelectedSigungu] = useState<string[]>([]);

  const handleSidoPress = async (sido: { name: string; code: string }) => {
    setSelectedSido(sido.name);
    setSigunguDisplay(sigunguBySido[sido.name]);
  };

  const handleSigunguPress = (sigungu: string) => {
    let name = "";
    if (selectedSido === "세종특별자치시") {
      name = "세종특별자치시";
    } else {
      name = selectedSido + " " + sigungu;
    }
    if (selectedSigungu.includes(name)) {
      setSelectedSigungu(selectedSigungu.filter((item) => item !== name));
    } else {
      if (selectedSigungu.length >= 5) {
        Alert.alert("최대 5개까지 선택 가능합니다.");
        return;
      }
      setSelectedSigungu([...selectedSigungu, name]);
    }
  };

  const handleConfirm = () => {
    onDismiss();
    setSelectedAreas(selectedSigungu);
  };

  useEffect(() => {
    async function getData() {
      const response = await getList();
      setSidoList(response.data.sido);
      setSigunguBySido(response.data.sigungu_by_sido);
      setSigunguDisplay(response.data.sigungu_by_sido.서울특별시);
    }

    getData();
  }, []);

  return (
    <Portal>
      <Dialog visible={visible} style={styles.modal}>
        <Dialog.Title>
          <Text variant="titleLarge">활동지역 선택 (최대 5지역)</Text>
        </Dialog.Title>
        <Dialog.Content>
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
              {sidoList.map((sido) => (
                <View
                  key={sido.code}
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
              {sigunguDisplay.map((sigungu) => (
                <View
                  key={sigungu.code}
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
          <ScrollView horizontal style={styles.selectedList}>
            {selectedSigungu.map((sigungu) => (
              <Chip
                key={sigungu}
                style={styles.chip}
                onClose={() =>
                  setSelectedSigungu(
                    selectedSigungu.filter((item) => item !== sigungu)
                  )
                }
              >
                {sigungu}
              </Chip>
            ))}
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>취소</Button>
          <Button onPress={handleConfirm}>확인</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    marginHorizontal: 15,
    borderRadius: 10,
    height: 600,
  },
  modalContent: {
    flexDirection: "row",
    marginBottom: 5,
  },
  modalItem: {
    flex: 1,
    alignItems: "center",
    fontWeight: "bold",
  },
  modalScroll: {
    flex: 1,
    maxHeight: 390,
  },
  textBox: {
    paddingVertical: 7,
  },
  selectedTextBox: {
    backgroundColor: "lightgreen",
    borderRadius: 10,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginVertical: 5,
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
    marginTop: 10,
  },
  chip: {
    marginHorizontal: 5,
    backgroundColor: themeColors.primary,
  },
});
