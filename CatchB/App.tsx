import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import TabContainer from "./src/navigation/TabStack";
import { store } from "./src/store/store";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TabContainer />
      </Provider>
    </NavigationContainer>
  );
}
