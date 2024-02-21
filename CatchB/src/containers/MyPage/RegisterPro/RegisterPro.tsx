import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

import CoachBasic from "./CoachBasic";
import FacilityBasic from "./FacilityBasic";
import ProgressSteps from "../../../components/Progress/ProgressSteps";
import { themeColors } from "../../../variables/colors";
import { MyPageStackScreenProps } from "../../../variables/navigation";

export default function RegisterPro() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const navigation =
    useNavigation<MyPageStackScreenProps<"RegisterPro">["navigation"]>();
  const route = useRoute<MyPageStackScreenProps<"RegisterPro">["route"]>();
  const { title, type } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text variant="headlineSmall" style={styles.header}>
          {title}
        </Text>
      ),
    });
  }, []);

  const steps = [
    {
      step: 1,
      label: "상세 정보",
    },
    {
      step: 2,
      label: "계좌 정보",
    },
    {
      step: 3,
      label: "가격 정보",
    },
  ];

  const render = () => {
    if (step === 0) {
      if (type === "coach") {
        return <CoachBasic onFinish={() => setStep(1)} />;
      }
      return <FacilityBasic onFinish={() => setStep(1)} />;
    } else if (step === 1) {
      return <></>;
    } else if (step === 2) {
      return <></>;
    } else {
      return <></>;
    }
  };

  return (
    <>
      <View style={styles.progressStep}>
        {step === 0 ? null : <ProgressSteps steps={steps} currentStep={step} />}
      </View>
      {render()}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    color: "green",
  },
  progressStep: {
    paddingHorizontal: 40,
    backgroundColor: themeColors.primaryContainer,
    paddingBottom: 10,
  },
});
