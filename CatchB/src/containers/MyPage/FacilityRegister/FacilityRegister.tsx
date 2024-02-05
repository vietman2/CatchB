import { useState } from "react";
import { View, StyleSheet } from "react-native";

import FacilityStep1 from "./FacilityStep1";
import FacilityStep2 from "./FacilityStep2";
import FacilityStep3 from "./FacilityStep3";
import FacilityStep4 from "./FacilityStep4";
import ProgressSteps from "../../../components/Progress/ProgressSteps";
import { themeColors } from "../../../variables/colors";

export default function FacilityRegister() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  const steps = [
    {
      step: 1,
      label: "시설 정보",
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
      return <FacilityStep1 onFinish={() => setStep(1)} />;
    } else if (step === 1) {
      return <FacilityStep2 onFinish={() => setStep(2)} />;
    } else if (step === 2) {
      return <FacilityStep3 onFinish={() => setStep(3)} />;
    } else {
      return <FacilityStep4 />
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
  progressStep: {
    paddingHorizontal: 40,
    backgroundColor: themeColors.primaryContainer,
    paddingBottom: 10,
  },
});
