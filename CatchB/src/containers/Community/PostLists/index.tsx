import { CommunityList } from "./CommunityList";
import { VideoList } from "./VideoList";

function BaseballCommunity() {
  return <CommunityList mode="덕아웃" />;
}

function RecruitmentCommunity() {
  return <CommunityList mode="드래프트" />;
}

function MarketCommunity() {
  return <CommunityList mode="장터" />;
}

export {
  BaseballCommunity,
  RecruitmentCommunity,
  MarketCommunity,
  VideoList as VideoCommunity,
};
