import { NavigationContainer } from "@react-navigation/native";
import CodePush from "react-native-code-push";

import TabContainer from "./src/navigation/TabStack";

function App() {
  return (
    <NavigationContainer>
      <TabContainer />
    </NavigationContainer>
  );
}

export default CodePush(App);
