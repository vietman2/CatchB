import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SvgCssUri } from "react-native-svg";
import { TagType } from "../../../variables/types/community";

interface Props {
  tag?: TagType;
  active?: boolean;
  blank?: boolean;
}

export default function Tag({ tag, active, blank }: Readonly<Props>) {
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

export function Chip({
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
          style={{ marginRight: 5 }}
          fillOpacity={active ? 1 : 0.25}
        />
      )}
      <Text style={{ color }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});
