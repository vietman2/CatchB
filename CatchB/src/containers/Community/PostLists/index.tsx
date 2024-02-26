import { CommunityList } from "./CommunityList";
import { VideoList } from "./VideoList";


function BaseballCommunity() {
  return <CommunityList mode="야구톡" />;
}

function RecruitmentCommunity() {
  return <CommunityList mode="모집" />;
}

export { BaseballCommunity, RecruitmentCommunity, VideoList as VideoCommunity };
