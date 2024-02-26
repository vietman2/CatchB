import { View } from "react-native";

import { CommunityList } from "./CommunityList";
import { VideoList } from "./VideoList";

// TODO: Remove This Later
export function PlaceholderComponent({ color }: Readonly<{ color: string }>) {
  return (
    <View
      style={{
        flex: 1,
        height: 200,
        backgroundColor: color,
      }}
    />
  );
}

function BaseballCommunity() {
  return <CommunityList mode="야구톡" />;
}

function RecruitmentCommunity() {
  return <CommunityList mode="모집" />;
}

export { BaseballCommunity, RecruitmentCommunity, VideoList as VideoCommunity };
