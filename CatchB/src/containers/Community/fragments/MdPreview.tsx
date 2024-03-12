import { useRef, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";
import Markdown, { MarkdownIt } from "react-native-markdown-display";

interface Props {
  content: string;
  uploadedImages: { url: string }[];
}

export default function Preview({ content, uploadedImages }: Readonly<Props>) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "80%"], []);

  const renderContent = () => {
    const contentWithImages = content
      .split("\n")
      .map((line, index) => {
        if (line.startsWith("![업로드")) {
          const imageIndex = parseInt(line.match(/\d+/)[0]) - 1;
          return `![업로드${imageIndex + 1}](${
            uploadedImages[imageIndex].url
          })`;
        }
        return line;
      })
      .join("\n");

    return contentWithImages;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={styles.container}
    >
      <ScrollView style={styles.bottomSheet}>
        <Text variant="titleMedium">내용 미리보기</Text>
        <Divider style={styles.divider} />
        <Markdown
          markdownit={MarkdownIt({ typographer: true }).disable([
            "heading",
            "code",
            "reference",
            "html_block",
            "link",
          ])}
        >
          {renderContent()}
        </Markdown>
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(245, 245, 245)",
  },
  bottomSheet: {
    backgroundColor: "rgb(245, 245, 245)",
    paddingHorizontal: 10,
  },
  divider: {
    marginVertical: 10,
  },
});
