import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { themeColors } from "../../variables/colors";

type Step = {
  step: number;
  label: string;
};

interface Props {
  steps: Step[];
  currentStep: number;
}

export function ProgressSteps({ steps, currentStep }: Readonly<Props>) {
  return (
    <View style={styles.horizontal}>
      {steps.map((step, index) => (
        <View key={step.step} style={styles.horizontal}>
          <View style={styles.inner}>
            <View
              style={[
                styles.circle,
                currentStep >= step.step
                  ? { backgroundColor: themeColors.primary }
                  : { backgroundColor: "silver" },
              ]}
            >
              <Text
                variant="titleMedium"
                style={
                  currentStep >= step.step
                    ? { color: "white" }
                    : { color: "gray" }
                }
              >
                {currentStep > step.step ? "✓" : step.step}
              </Text>
            </View>
            <Text
              key={step.step}
              style={
                currentStep === step.step
                  ? { color: themeColors.primary, fontWeight: "bold" }
                  : { color: "silver" }
              }
            >
              {step.label}
            </Text>
          </View>
          {index === steps.length - 1 ? null : (
            <View
              style={[
                styles.line,
                currentStep > step.step
                  ? { backgroundColor: themeColors.primary }
                  : { backgroundColor: "silver" },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  line: {
    height: 3,
    width: 60,
    marginBottom: 17,
  },
});
