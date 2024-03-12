import { CommunityList } from "./CommunityList";
import { VideoList } from "./VideoList";


function BaseballCommunity() {
  return <CommunityList mode="덕아웃" />;
}

function RecruitmentCommunity() {
  return <CommunityList mode="드래프트" />;
}

export { BaseballCommunity, RecruitmentCommunity, VideoList as VideoCommunity };
