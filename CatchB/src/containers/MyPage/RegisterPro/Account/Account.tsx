import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

import {
  Bank,
  BankAccountPreview,
  BankChoice,
  IconButton,
  IconText,
  MainTitle,
  SubTitle,
} from "../fragments";
import { RegisterProTerms } from "../../../../components/Terms";
import { sampleBankAccounts } from ".data/payments";
import { getBankList } from ".services/payments";
import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";
import { BankType } from ".types/payments";

interface Props {
  onFinish: () => void;
}

export default function Account({ onFinish }: Readonly<Props>) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["90%"], []);
  //const [selectedBank, setSelectedBank] = useState<BankAccountType | null>(
  //  null
  //);
  const [bankList, setBankList] = useState<BankType[]>([]);
  const [addNew, setAddNew] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleSubmitSuccess = () => {
    onFinish();
  };

  /*
  const handleNext = () => {
    // TODO: API 연동
  }; */

  const handleBankChoicePress = async () => {
    bottomSheetRef.current?.expand();
  };

  useEffect(() => {
    const getList = async () => {
      const response = await getBankList(token);
      if (response) {
        setBankList(response.data);
      }
    };

    getList();
  }, []);

  const handleNewAccount = () => {
    setAddNew(true);
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode="on-drag"
      >
        <MainTitle text="계좌 정보" sub="정산액은 매주 월요일에 입금돼요!" />
        <SubTitle text="계좌 선택하기" sub=" 정산받을 계좌를 선택하세요!" />
        <IconText text="MY 계좌" icon="wallet" />
        {/* TODO: 조건 추가하기: 없으면 없다고 표시. 있으면 전부 표시 */}
        <BankAccountPreview account={sampleBankAccounts[0]} />
        {addNew ? (
          <View style={styles.newAccount}>
            <IconText text="신규 계좌 추가" icon="wallet-plus" />
            <TouchableOpacity onPress={handleBankChoicePress}>
              <Bank />
            </TouchableOpacity>
          </View>
        ) : (
          <IconButton
            text="계좌 정보 추가하기"
            icon="plus-circle"
            onPress={handleNewAccount}
          />
        )}
        <Divider style={styles.divider} />
        <RegisterProTerms />
        <Button
          mode="contained"
          onPress={handleSubmitSuccess}
          style={styles.button}
        >
          다음 (2/3)
        </Button>
      </ScrollView>
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
        <View style={styles.bottomSheet}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {bankList.map((bank, index) => (
                <TouchableOpacity key={index} onPress={() => {}}>
                  <BankChoice key={index} bank={bank} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <Button
            mode="contained"
            onPress={() => bottomSheetRef.current?.close()}
            style={styles.button}
          >
            취소
          </Button>
        </View>
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
  button: {
    marginTop: 10,
    marginBottom: 20,
  },
  bottomSheet: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  newAccount: {
    marginTop: 10,
  },
  divider: {
    marginVertical: 20,
  },
});
