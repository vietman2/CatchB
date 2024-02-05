import { useState } from "react";
import { View, StyleSheet } from "react-native";

import CoachStep1 from "./CoachStep1";
import CoachStep2 from "./CoachStep2";
import CoachStep3 from "./CoachStep3";
import CoachStep4 from "./CoachStep4";
import ProgressSteps from "../../../components/Progress/ProgressSteps";
import { themeColors } from "../../../variables/colors";

export default function CoachRegister() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

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
      return <CoachStep1 onFinish={() => setStep(1)} />;
    } else if (step === 1) {
      return <CoachStep2 onFinish={() => setStep(2)} />;
    } else if (step === 2) {
      return <CoachStep3 onFinish={() => setStep(3)} />;
    } else {
      return <CoachStep4 />;
    }
  }

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
  progressStep: {
    paddingHorizontal: 40,
    backgroundColor: themeColors.primaryContainer,
    paddingBottom: 10,
  },
});
