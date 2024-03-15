import { Dispatch, SetStateAction } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import { themeColors } from ".themes/colors";
import { SigunguType } from ".types/products";

interface Props {
  options: SigunguType[];
  multiSelected: SigunguType[];
  setMultiSelected: Dispatch<SetStateAction<SigunguType[]>>;
  showSnackBar: (show: boolean) => void;
}

export function RegionSelector({
  options,
  multiSelected,
  setMultiSelected,
  showSnackBar,
}: Readonly<Props>) {
  const isSelected = (option: SigunguType) => {
    return multiSelected.includes(option);
  };

  const toggleSelected = (option: SigunguType) => {
    if (multiSelected.includes(option)) {
      setMultiSelected(multiSelected.filter((item) => item !== option));
    } else {
      // if length exceeds 5, snack bar should be shown
      if (multiSelected.length < 5) {
        setMultiSelected([...multiSelected, option]);
      } else {
        showSnackBar(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.code}
          onPress={() => toggleSelected(option)}
          style={{
            marginRight: 10,
            marginBottom: 10,
            borderRadius: 8,
            backgroundColor: isSelected(option)
              ? themeColors.tertiaryContainer
              : themeColors.tertiary,
          }}
        >
          <View style={styles.box}>
            <Text
              style={[
                styles.label,
                { color: isSelected(option) ? "white" : "black" },
              ]}
            >
              {option.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
  },
});
