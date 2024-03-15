import { Dispatch, SetStateAction } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Chip, Icon, Surface, Text } from "react-native-paper";

import { CoachType } from ".types/products";

const { width } = Dimensions.get("window");

export function CoachPreview({ coach }: Readonly<{ coach: CoachType }>) {
  return (
    <View style={styles.container}>
      <Image source={coach.image} style={styles.image} />
      <View style={styles.info}>
        <Text variant="titleLarge" style={styles.name}>
          {coach.coach_name} 코치
        </Text>
        <View style={styles.ratings}>
          <Icon source="star" color="gold" size={20} />
          <Text variant="titleSmall">{coach.rating}/10</Text>
        </View>
        <Text variant="titleSmall">{coach.working_area}</Text>
        <View style={styles.mainPrice}>
          <Text variant="titleSmall">1회 / 60분 50,000원</Text>
        </View>
      </View>
    </View>
  );
}

export function Shortcut({ text }: Readonly<{ text: string }>) {
  const shortcutWidth = (width - 90) / 4;
  return (
    <Surface style={[styles.shortcut, { width: shortcutWidth }]}>
      <Text style={styles.shortcutText}>{text}</Text>
    </Surface>
  );
}

export type CoachTypes = "타격" | "투구" | "수비" | "포수";

interface Props {
  selected: CoachTypes;
  setSelected: Dispatch<SetStateAction<CoachTypes>>;
}

export function Filters({ selected, setSelected }: Readonly<Props>) {
  function FilterChip({ label }: Readonly<{ label: CoachTypes }>) {
    return (
      <TouchableOpacity onPress={() => setSelected(label as CoachTypes)}>
        <Chip style={label === selected ? styles.selectedChip : styles.chip}>
          {label}
        </Chip>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <FilterChip label="타격" />
      <FilterChip label="투구" />
      <FilterChip label="수비" />
      <FilterChip label="포수" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 40,
  },
  image: {
    flex: 3,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  info: {
    flex: 7,
    marginLeft: 20,
  },
  name: {
    fontWeight: "bold",
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainPrice: {
    alignItems: "flex-end",
  },
  shortcut: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "green",
    paddingVertical: 15,
  },
  shortcutText: {
    fontFamily: "Catch B Bold",
    fontSize: 18,
  },
  chip: {
    backgroundColor: "silver",
    marginRight: 10,
  },
  selectedChip: {
    backgroundColor: "green",
    marginRight: 10,
  },
});
