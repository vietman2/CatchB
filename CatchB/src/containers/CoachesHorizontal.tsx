import { ScrollView } from "react-native";

import LessonCoach from "./LessonCoach";
import { MainHeading } from "../components/Heading";
import { coaches } from "../variables/dummydata";

export default function CoachesHorizontal() {
  return (
    <>
      <MainHeading content="우리 동네 추천 레슨 코치!" />
      <ScrollView style={{ flexDirection: "row" }} horizontal>
        <LessonCoach coach={coaches[0]} />
        <LessonCoach coach={coaches[2]} />
        <LessonCoach coach={coaches[1]} />
      </ScrollView>
    </>
  );
}
