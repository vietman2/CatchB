import { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Button, Divider, TextInput } from "react-native-paper";
import { ImagePickerAsset } from "expo-image-picker";

import { amenityChoices, equipmentChoices, otherChoices } from "./options";
import { MainTitle, SubTitle } from "../fragments";
import { Selector } from "../../../../components/Selectors";
import {
  ImagePicker,
  NumberPicker,
  WorkTimePickers,
} from "../../../../components/Pickers";
import { uploadDetails } from "../../../../services/facility/facility";
import { RootState } from "../../../../store/store";
import { themeColors } from "../../../../variables/colors";

interface Props {
  onFinish: () => void;
}

export default function FacilityDetail({ onFinish }: Readonly<Props>) {
  const [waiting, setWaiting] = useState<boolean>(false);
  // text inputs
  const [introduction, setIntroduction] = useState<string>("");
  const [additionalEquipment, setAdditionalEquipment] = useState<string>("");
  // time
  const [weekdayStart, setWeekdayStart] = useState<string>("");
  const [weekdayEnd, setWeekdayEnd] = useState<string>("");
  const [saturdayStart, setSaturdayStart] = useState<string>("");
  const [saturdayEnd, setSaturdayEnd] = useState<string>("");
  const [sundayStart, setSundayStart] = useState<string>("");
  const [sundayEnd, setSundayEnd] = useState<string>("");
  // selected items
  const [amenities, setAmenities] = useState<string[]>(["Wi-Fi"]);
  const [equipment, setEquipment] = useState<string[]>(["나무배트"]);
  const [others, setOthers] = useState<string[]>(["단체 수업 가능"]);
  const [custom, setCustom] = useState<string[]>([]);
  const [numMounds, setNumMounds] = useState<number>(1);
  const [numPlates, setNumPlates] = useState<number>(1);
  // image picker
  const [uploadedImages, setUploadedImages] = useState<ImagePickerAsset[]>([]);

  const facility_uuid = useSelector(
    (state: RootState) => state.facility.myFacilityUuid
  );
  const token = useSelector((state: RootState) => state.auth.token);

  const handleAddEquipment = () => {
    if (additionalEquipment === "") {
      return;
    }
    if (custom.includes(additionalEquipment)) {
      Alert.alert("이미 선택된 장비입니다.");
      return;
    }
    setCustom([...custom, additionalEquipment]);
    setAdditionalEquipment("");
  };

  const handleSubmitSuccess = () => {
    Alert.alert(
      "정보 입력 성공!",
      "아카데미 상세 정보가 성공적으로 등록되었습니다.",
      [{ text: "다음", onPress: onFinish, isPreferred: true }]
    );
  };

  const handleSubmit = async () => {
    setWaiting(true);
    const response = await uploadDetails(
      facility_uuid,
      introduction,
      {
        weekday_open: weekdayStart,
        weekday_close: weekdayEnd,
        saturday_open: saturdayStart,
        saturday_close: saturdayEnd,
        sunday_open: sundayStart,
        sunday_close: sundayEnd,
      },
      amenities,
      equipment,
      numMounds,
      numPlates,
      custom,
      others,
      uploadedImages,
      token
    );

    if (response.status === 201) {
      handleSubmitSuccess();
    } else if (response.status === 400) {
      Alert.alert("등록 실패", response.data.message);
    } else {
      Alert.alert("등록 실패", "서버에 오류가 발생했습니다.");
    }
    setWaiting(false);
  };

  return (
    <ScrollView style={styles.container} keyboardDismissMode="on-drag">
      <MainTitle
        text="상세 정보"
        sub="상세 정보를 다 입력하면 문의 받을 확률이 3배 높아요!"
      />
      <SubTitle text="아카데미 소개" />
      <TextInput
        mode="outlined"
        placeholder={
          "아카데미에 대한 소개 글을 자유롭게 작성해주세요!\n\n최대 1000자"
        }
        value={introduction}
        onChangeText={(text) => setIntroduction(text)}
        textColor="black"
        outlineColor="rgba(0, 128, 0, 0.8)"
        activeOutlineColor="rgba(0, 128, 0, 0.8)"
        placeholderTextColor="gray"
        multiline
        maxLength={1000}
        style={{ height: 150 }}
        testID="introduction"
      />
      <SubTitle text="영업 시간" sub={" 나중에 변경할 수 있어요!"} />
      <WorkTimePickers
        weekdayStart={weekdayStart}
        setWeekdayStart={setWeekdayStart}
        weekdayEnd={weekdayEnd}
        setWeekdayEnd={setWeekdayEnd}
        saturdayStart={saturdayStart}
        setSaturdayStart={setSaturdayStart}
        saturdayEnd={saturdayEnd}
        setSaturdayEnd={setSaturdayEnd}
        sundayStart={sundayStart}
        setSundayStart={setSundayStart}
        sundayEnd={sundayEnd}
        setSundayEnd={setSundayEnd}
      />
      <Divider bold style={styles.divider} />
      <SubTitle text="편의시설 및 서비스" />
      <Selector
        multiple
        numItemsInRow={2}
        options={amenityChoices}
        multiSelected={amenities}
        setMultiSelected={setAmenities}
      />
      <SubTitle text="구비 시설" />
      <NumberPicker
        label="마운드 수"
        value={numMounds}
        onChange={setNumMounds}
      />
      <NumberPicker label="타석 수" value={numPlates} onChange={setNumPlates} />
      <Selector
        multiple
        numItemsInRow={2}
        options={equipmentChoices}
        multiSelected={equipment}
        setMultiSelected={setEquipment}
      />
      <Selector
        multiple
        numItemsInRow={2}
        options={custom}
        multiSelected={custom}
        setMultiSelected={setCustom}
      />
      <TextInput
        label="추가 구비 시설 (직접 입력)"
        value={additionalEquipment}
        onChangeText={(text) => setAdditionalEquipment(text)}
        placeholder="예: 랩소도"
        placeholderTextColor="gray"
        right={
          <TextInput.Icon
            icon="plus-circle"
            color="green"
            onPress={handleAddEquipment}
          />
        }
        style={{ marginRight: 10, marginBottom: 10 }}
        dense
        testID="additionalEquipment"
      />
      <SubTitle text="기타" />
      <Selector
        multiple
        numItemsInRow={2}
        options={otherChoices}
        multiSelected={others}
        setMultiSelected={setOthers}
      />
      <Divider bold style={styles.divider} />
      <SubTitle text={`아카데미 소개 사진: (${uploadedImages.length}/10)`} />
      <ImagePicker
        uploadedImages={uploadedImages}
        setUploadedImages={setUploadedImages}
      />
      <Divider bold style={styles.divider} />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit}
        loading={waiting}
      >
        {waiting ? "" : "완료 (1/3)"}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  description: {
    marginBottom: 5,
    color: "gray",
  },
  divider: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 40,
  },
});
