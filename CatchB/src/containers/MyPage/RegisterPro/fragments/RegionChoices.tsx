import { Dispatch, SetStateAction } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import { RegionSelector, Selector } from ".components/Selectors";
import { RegionsType, SigunguType } from ".constants/types/products";

interface Props {
  data: RegionsType;
  selectedSido: string;
  setSelectedSido: (sido: string) => void;
  selectedRegions: SigunguType[];
  setSelectedRegions: (regions: SigunguType[]) => void;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export function RegionChoices({
  data,
  selectedSido,
  setSelectedSido,
  selectedRegions,
  setSelectedRegions,
  setVisible,
}: Readonly<Props>) {
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.horizontal}>
        <Text style={styles.left}>시/도</Text>
        <View style={styles.right}>
          <Selector
            numItemsInRow={2}
            options={data?.sido.map((sido) => sido.label) || []}
            singleSelected={selectedSido}
            setSingleSelected={setSelectedSido}
            noIcon
          />
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.horizontal}>
        <Text style={styles.left}>시/군/구</Text>
        <View style={styles.right}>
          <RegionSelector
            options={data?.sigungu[selectedSido] || []}
            multiSelected={selectedRegions}
            setMultiSelected={setSelectedRegions}
            showSnackBar={setVisible}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  horizontal: {
    flexDirection: "row",
  },
  left: {
    flex: 2,
    marginRight: 10,
  },
  right: {
    flex: 8,
  },
  divider: {
    marginVertical: 10,
  },
});
