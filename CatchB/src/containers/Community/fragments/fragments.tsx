import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SvgCssUri } from "react-native-svg";

import { TagType } from ".types/community";

interface Props {
  title: string;
  text: string;
  disabled?: boolean;
}

export function InputText({ title, text, disabled }: Props) {
  if (disabled) {
    return (
      <View style={styles.disabledContainer}>
        <Text variant="titleMedium">{title}</Text>
        <View style={styles.disabled}>
          <Text variant="titleMedium">{text}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">{text}</Text>
    </View>
  );
}

interface TagProps {
  tag?: TagType;
  active?: boolean;
  blank?: boolean;
}

export function Tag({ tag, active, blank }: Readonly<TagProps>) {
  if (blank)
    return <Chip label="선택하기" backgroundColor="gray" color="white" />;

  return (
    <Chip
      label={tag.name}
      backgroundColor={tag.bgcolor}
      color={tag.color}
      icon={tag.icon}
      active={active}
    />
  );
}

interface ChipProps {
  icon?: string;
  label: string;
  color: string;
  backgroundColor: string;
  active?: boolean;
}

function Chip({
  icon,
  label,
  color,
  backgroundColor,
  active,
}: Readonly<ChipProps>) {
  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: active ? backgroundColor : "silver",
          opacity: active ? 1 : 0.5,
        },
      ]}
    >
      {icon === undefined ? null : (
        <SvgCssUri
          width={16}
          height={16}
          uri={icon}
          style={styles.svg}
          fillOpacity={active ? 1 : 0.25}
        />
      )}
      <Text style={{ color }}>{label}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {},
  disabledContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  disabled: {
    backgroundColor: "rgba(192, 192, 192, 0.15)",
    height: 40,
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7.5,
    borderRadius: 10,
    marginRight: 10,
  },
  svg: {
    marginRight: 5,
  },
});
