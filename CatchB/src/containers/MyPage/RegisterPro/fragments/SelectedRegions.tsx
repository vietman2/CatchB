import { StyleSheet, View } from "react-native";

import { RegionChip } from ".components/Chips";
import { SigunguType } from ".constants/types/products";

interface Props {
  selectedRegions: SigunguType[];
  removeSelected: (region: SigunguType) => void;
}

export function SelectedRegions({
  selectedRegions,
  removeSelected,
}: Readonly<Props>) {
  return (
    <View style={styles.chips}>
      {selectedRegions.map((region) => (
        <RegionChip
          text={region.name}
          onPress={() => removeSelected(region)}
          key={region.code}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
});
