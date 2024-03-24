import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

import Account from "./Account/Account";
import Prices from "./Prices/Prices";
import CoachBasic from "./Basic/CoachBasic";
import FacilityBasic from "./Basic/FacilityBasic";
import CoachInfo from "./Info/CoachInfo";
import FacilityInfo from "./Info/FacilityInfo";
import { ProgressSteps } from ".components/Progress";
import { MyPageScreenProps } from ".constants/navigation";
import { getFacilityStatus, getCoachStatus } from ".services/products";
import { AppDispatch, RootState } from ".store/index";
import { setMyCoachUuid } from ".store/products/coachSlice";
import { setMyFacilityUuid } from ".store/products/facilitySlice";
import { themeColors } from ".themes/colors";

export default function RegisterPro() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<MyPageScreenProps<"RegisterPro">["navigation"]>();
  const route = useRoute<MyPageScreenProps<"RegisterPro">["route"]>();
  const { title, type } = route.params;

  const statusAlert = (title: string, body: string, action?: () => void) => {
    Alert.alert(title, body, [
      {
        text: "확인",
        onPress: action,
      },
    ]);
  };

  useEffect(() => {
    const fetchRegisterState = async () => {
      if (type === "coach") {
        const response = await getCoachStatus(user.uuid, token);

        if (response.status === 200) {
          statusAlert(response.data.title, response.data.message);

          if (response.data.step > 0) {
            await dispatch(setMyCoachUuid(response.data.coach));
            setStep(response.data.step);
          }

          if (response.data.step === -1) {
            statusAlert(response.data.title, response.data.message, () => navigation.goBack());
          }
        } else if (response.status === 400) {
          statusAlert(response.data.title, response.data.message, () => navigation.goBack());
        }
      } else {
        const response = await getFacilityStatus(user.uuid, token);

        if (response.status === 200) {
          statusAlert(response.data.title, response.data.message);

          if (response.data.step > 0) {
            await dispatch(setMyFacilityUuid(response.data.facility));
            setStep(response.data.step);
          }
        } else if (response.status === 400) {
          statusAlert(response.data.title, response.data.message, () =>
            navigation.navigate("MyPageScreen")
          );
        }
      }
    };

    fetchRegisterState();

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
      if (type === "coach") {
        return <CoachInfo onFinish={() => setStep(2)} />;
      }
      return <FacilityInfo onFinish={() => setStep(2)} />;
    } else if (step === 2) {
      return <Account onFinish={() => setStep(3)} />;
    } else {
      return <Prices />;
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
