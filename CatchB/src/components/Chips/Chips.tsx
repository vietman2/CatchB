import { StyleSheet } from "react-native";
import { Chip, Surface } from "react-native-paper";

interface Props {
  text: string;
  icon?: string;
  backgroundColor: string;
  textColor: string;
  redDot?: boolean;
}

export const NotificationChip = ({
  text,
  icon,
  backgroundColor,
  textColor,
}: Readonly<Props>) => (
  <Chip
    style={{ ...styles.chip, backgroundColor: backgroundColor }}
    textStyle={{
      color: textColor,
      fontSize: 20,
    }}
    icon={icon}
    closeIcon="circle-medium"
  >
    {text}
  </Chip>
);

export const NotificationChipWithSurface = ({
  text,
  icon,
  backgroundColor,
  textColor,
  redDot,
}: Readonly<Props>) => (
  <Surface
    elevation={4}
    style={
      redDot
        ? { borderRadius: 10, margin: 5 }
        : { backgroundColor: "#fff", borderRadius: 10, margin: 5 }
    }
  >
    <Chip
      style={{ ...styles.chip, margin: 0, backgroundColor: backgroundColor }}
      textStyle={{
        fontSize: 20,
        color: textColor,
      }}
      icon={icon}
      closeIcon="circle-medium"
    >
      {text}
    </Chip>
  </Surface>
);

export const SimpleChip = ({ text, backgroundColor, textColor }: Readonly<Props>) => (
  <Chip
    style={{ ...styles.simpleChip, backgroundColor: backgroundColor }}
    textStyle={{
      color: textColor,
      fontWeight: "bold",
      fontSize: 16,
    }}
    compact={true}
  >
    {text}
  </Chip>
);

const styles = StyleSheet.create({
  chip: {
    margin: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  simpleChip: {
    margin: 5,
    alignSelf: "flex-start",
  },
});
