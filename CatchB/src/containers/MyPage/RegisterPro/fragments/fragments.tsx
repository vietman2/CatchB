import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { SvgCssUri } from "react-native-svg";

import { themeColors } from "../../../../variables/colors";
import {
  BankAccountType,
  BankType,
} from "../../../../variables/types/payments";

interface Props {
  text: string;
  sub?: string;
  icon?: string;
  onPress?: () => void;
}

export function MainTitle({ text, sub }: Readonly<Props>) {
  const subExists = sub ? true : false;

  return (
    <>
      <Text variant="headlineSmall" style={styles.title}>
        {text}
      </Text>
      {subExists ? (
        <Text variant="titleMedium" style={styles.description}>
          {sub}
        </Text>
      ) : null}
    </>
  );
}

export function SubTitle({ text, sub }: Readonly<Props>) {
  const subExists = sub ? true : false;

  return (
    <Text style={styles.subtitle}>
      {text}
      {subExists ? (
        <Text variant="titleSmall" style={{ color: "gray" }}>
          {sub}
        </Text>
      ) : null}
    </Text>
  );
}

export function DisabledTextInput({ text }: Readonly<Props>) {
  return (
    <View style={styles.disabled}>
      <Text variant="titleMedium">{text}</Text>
    </View>
  );
}

export function IconButton({ text, icon, onPress }: Readonly<Props>) {
  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <Icon source={icon} size={20} color={themeColors.primary} />
      <Text variant="titleSmall" style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export function IconText({ text, icon }: Readonly<Props>) {
  return (
    <View style={styles.iconText}>
      <Icon source={icon} size={24} color={themeColors.primary} />
      <Text variant="titleLarge" style={styles.titleText}>
        {text}
      </Text>
    </View>
  );
}

interface AccountProps {
  account: BankAccountType;
}

export function BankAccountPreview({ account }: Readonly<AccountProps>) {
  const renderAccountNumber = (account: string) => {
    return account.slice(0, 3) + "******" + account.slice(-3);
  };

  return (
    <View style={styles.bankAccount}>
      <SvgCssUri width="40" height="40" uri={account.bank.icon} />
      <Text variant="titleLarge" style={styles.accountText}>
        {account.bank.name} {renderAccountNumber(account.account_number)}
      </Text>
    </View>
  );
}

interface BankProps {
  bank?: BankType;
}

export function Bank({ bank }: Readonly<BankProps>) {
  return (
    <View style={styles.bank}>
      {bank ? null : <View style={styles.placeholder} />}
      <Text variant="titleLarge" style={{ color: "gray" }}>
        은행 선택
      </Text>
    </View>
  );
}

export function BankChoice({ bank }: Readonly<BankProps>) {
  return (
    <View style={styles.bankChoice}>
      <SvgCssUri width="40" height="40" uri={bank.icon} />
      <Text variant="titleMedium">{bank.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
  description: {
    marginBottom: 5,
    color: "gray",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "rgba(192, 192, 192, 0.15)",
    height: 40,
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 5,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    color: themeColors.primary,
    fontWeight: "bold",
    marginLeft: 5,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  buttonText: {
    marginLeft: 5,
    color: themeColors.primary,
  },
  bankAccount: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderColor: "green",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 5,
  },
  accountText: {
    marginLeft: 10,
  },
  bank: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  placeholder: {
    width: 40,
    height: 40,
    backgroundColor: "gray",
    marginRight: 10,
    borderRadius: 20,
  },
  bankChoice: {
    width: Dimensions.get("window").width * 0.275,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 10,
  },
});
