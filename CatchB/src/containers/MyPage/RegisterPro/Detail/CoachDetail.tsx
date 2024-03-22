import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { Button, Divider, Snackbar, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { ImagePickerAsset } from "expo-image-picker";
import BottomSheet from "@gorhom/bottom-sheet";

import { partChoices, levelChoices, typeChoices } from "./options";
import {
  MainTitle,
  SubTitle,
  RegionChoices,
  SelectedRegions,
} from "../fragments";
import { LoadingComponent } from ".components/Loading";
import { ImagePicker } from ".components/Pickers";
import { Selector } from ".components/Selectors";
import { getRegionsList, postCoachInfo } from ".services/products";
import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";
import { RegionsType, SigunguType } from ".types/products";

interface Props {
  onFinish: () => void;
}

export default function CoachDetail({ onFinish }: Readonly<Props>) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["93%"], []);
  const [selectedParts, setSelectedParts] = useState<string[]>(["투구"]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(["비기너1"]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["개인 레슨"]);
  const [visible, setVisible] = useState<boolean>(false);
  const [intro, setIntro] = useState<string>("");
  const [medias, setMedias] = useState<ImagePickerAsset[]>([]);
  const [selectedSido, setSelectedSido] = useState<string>("서울");
  const [selectedRegions, setSelectedRegions] = useState<SigunguType[]>([]);
  const [data, setData] = useState<RegionsType>();
  const [loading, setLoading] = useState<boolean>(false);

  const coach_uuid = useSelector((state: RootState) => state.coach.myCoachUuid);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleSubmitSuccess = () => {
    Alert.alert(
      "등록 성공",
      "코치님의 상세 정보가 성공적으로 등록되었습니다.",
      [{ text: "확인", onPress: onFinish, isPreferred: true }]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    const response = await postCoachInfo(
      coach_uuid,
      intro,
      selectedParts,
      selectedLevels,
      selectedTypes,
      medias,
      selectedRegions,
      token
    );

    if (response.status === 201) {
      handleSubmitSuccess();
    } else if (response.status === 400) {
      Alert.alert("등록 실패", response.data.message);
    } else {
      Alert.alert(
        "등록 실패",
        "서버에 오류가 발생했습니다. 나중에 다시 시도해주세요."
      );
    }
    setLoading(false);
  };

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
        <SelectedRegions
          selectedRegions={selectedRegions}
          removeSelected={removeSelected}
        />
        <Button onPress={() => bottomSheetRef.current?.expand()}>
          {selectedRegions.length > 0 ? "다시 선택하기" : "선택하기"}
        </Button>
        {loading ? (
          <LoadingComponent style={styles.button} />
        ) : (
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            다음 (1/3)
          </Button>
        )}
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableHandlePanningGesture={false}
      >
        <RegionChoices
          data={data}
          selectedSido={selectedSido}
          setSelectedSido={setSelectedSido}
          selectedRegions={selectedRegions}
          setSelectedRegions={setSelectedRegions}
          setVisible={setVisible}
        />
        <SelectedRegions
          selectedRegions={selectedRegions}
          removeSelected={removeSelected}
        />
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
