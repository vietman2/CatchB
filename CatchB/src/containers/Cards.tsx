import { View } from "react-native";

import Card from "../components/Card";

interface Props {
  response_rate: string | undefined;
  consults: string | undefined;
  likes: string | undefined;
}

export default function Cards({ response_rate, consults, likes }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 10,
      }}
    >
      <Card title="응답률" description={response_rate} icon="paper-plane" />
      <Card title="채팅 상담" description={consults} icon="chatbox-ellipses" />
      <Card title="좋아요" description={likes} icon="heart" />
    </View>
  );
}
