import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  Chip,
  Divider,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { ImagePickerAsset } from "expo-image-picker";
import BottomSheet from "@gorhom/bottom-sheet";

import { partChoices, levelChoices, typeChoices } from "./options";
import { MainTitle, SubTitle } from "../fragments";
import { ImagePicker } from ".components/Pickers";
import { RegionSelector, Selector } from ".components/Selectors";
import { getRegionsList } from ".services/products";
import { themeColors } from ".themes/colors";
import { SidoType, SigunguType } from ".types/products";

interface Props {
  onFinish: () => void;
}

type Data = {
  sido: SidoType[];
  sigungu: Record<string, SigunguType[]>;
};

export default function CoachDetail({ onFinish }: Readonly<Props>) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["93%"], []);
  const [selectedParts, setSelectedParts] = useState<string[]>(["투구"]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(["비기너1"]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["개인"]);
  const [visible, setVisible] = useState<boolean>(false);
  const [intro, setIntro] = useState<string>("");
  const [medias, setMedias] = useState<ImagePickerAsset[]>([]);
  const [selectedSido, setSelectedSido] = useState<string>("서울");
  const [selectedRegions, setSelectedRegions] = useState<SigunguType[]>([]);
  const [data, setData] = useState<Data>();

  const handleSubmitSuccess = () => {
    onFinish();
  };

  /*
  const handleSubmit = () => {
    // TODO: API 연동
  };*/

  useEffect(() => {
    const getRegions = async () => {
      const response = await getRegionsList();

      if (response.status === 200) {
        setData(response.data);
      }
    };

    getRegions();
  }, []);

  const removeSelected = (selected: SigunguType) => {
    setSelectedRegions(selectedRegions.filter((region) => region !== selected));
  };

  const textInputProps = {
    placeholder:
      "선수 경력: \n- 양천중-서울고-서울대\n- 2018: 두산 베어스 입단\n\n코치 경력: \n- 2023년 키움 히어로즈 작전코치\n\n소개글:\n안녕하세요 홍승우입니다.\n\n야구 입문자부터 선수까지 개개인의 특성에 맞춰 친절하고 자세히 설명해드립니다.\n\n비디오 분석을 통한 꼼꼼한 레슨으로 여러분들의 야구 실력을 향상시켜드리겠습니다.",
    textColor: "black",
    placeholderTextColor: "gray",
    multiline: true,
    maxLength: 1000,
    style: styles.textInput,
    testID: "curriculum",
  };

  return (
    <>
      <ScrollView style={styles.container} keyboardDismissMode="on-drag">
        <MainTitle
          text="상세 정보"
          sub="상세 정보를 다 입력하면 문의 받을 확률이 3배 높아요!"
        />
        <SubTitle
          text="소개글"
          sub=" 코치님의 소개글을 자유롭게 작성해주세요. (최대 1000자)"
        />
        <TextInput
          mode="outlined"
          value={intro}
          onChangeText={(text) => setIntro(text)}
          {...textInputProps}
        />
        <Divider style={styles.divider} />
        <SubTitle text="전문 파트 (복수 선택 가능)" />
        <Selector
          multiple
          numItemsInRow={2}
          options={partChoices}
          multiSelected={selectedParts}
          setMultiSelected={setSelectedParts}
        />
        <SubTitle text="레슨 레벨 (복수 선택 가능)" />
        <Selector
          multiple
          numItemsInRow={2}
          options={levelChoices}
          multiSelected={selectedLevels}
          setMultiSelected={setSelectedLevels}
        />
        <SubTitle text="레슨 유형 (복수 선택 가능)" />
        <Selector
          multiple
          numItemsInRow={2}
          options={typeChoices}
          multiSelected={selectedTypes}
          setMultiSelected={setSelectedTypes}
        />
        <Divider style={styles.divider} />
        <SubTitle text="소개 사진/영상" sub=" 소개 영상은 최대 15MB" />
        <ImagePicker uploadedImages={medias} setUploadedImages={setMedias} />
        <Divider style={styles.divider} />
        <SubTitle text="선호 활동 지역" sub=" 선택하면 초기 검색에 유리해요!" />
        {selectedRegions.length > 0 && (
          <Text style={{ marginBottom: 10 }}>
            선택한 지역:{" "}
            {selectedRegions.map((region) => region.name).join(", ")}
          </Text>
        )}
        <Button onPress={() => bottomSheetRef.current?.expand()}>
          {selectedRegions.length > 0 ? "다시 선택하기" : "선택하기"}
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmitSuccess}
          style={styles.button}
        >
          다음 (1/3)
        </Button>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableHandlePanningGesture={false}
      >
        <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 2, marginRight: 10 }}>시/도</Text>
            <View style={{ flex: 8 }}>
              <Selector
                numItemsInRow={2}
                options={data?.sido.map((sido) => sido.label) || []}
                singleSelected={selectedSido}
                setSingleSelected={setSelectedSido}
                noIcon
              />
            </View>
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 2, marginRight: 10 }}>시/군/구</Text>
            <View style={{ flex: 8 }}>
              <RegionSelector
                options={data?.sigungu[selectedSido] || []}
                multiSelected={selectedRegions}
                setMultiSelected={setSelectedRegions}
                showSnackBar={setVisible}
              />
            </View>
          </View>
        </ScrollView>
        {selectedRegions.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              paddingHorizontal: 20,
            }}
          >
            {selectedRegions.map((region) => (
              <TouchableOpacity
                key={region.code}
                onPress={() => removeSelected(region)}
              >
                <Chip style={{ margin: 5, backgroundColor: "green" }}>
                  {region.name}
                </Chip>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <Button
          mode="contained"
          onPress={() => bottomSheetRef.current?.close()}
          style={styles.button}
        >
          확인
        </Button>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label: "확인",
            onPress: () => setVisible(false),
          }}
        >
          최대 5개까지 선택할 수 있어요!
        </Snackbar>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  description: {
    marginBottom: 5,
    color: "gray",
  },
  divider: {
    marginVertical: 10,
  },
  textInput: {
    height: 300,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
});
