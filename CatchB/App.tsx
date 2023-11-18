import { NavigationContainer } from "@react-navigation/native";

import TabContainer from "./src/navigation/TabStack";

export default function App() {
  return (
    <NavigationContainer>
      <TabContainer />
    </NavigationContainer>
  );
}
