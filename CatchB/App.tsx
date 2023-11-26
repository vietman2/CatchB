import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";

import TabContainer from "./src/navigation/TabStack";
import useFonts from "./src/hooks/useFonts";
import { store } from "./src/store/store";

export default function App() {
  const isReady = useFonts();

  if (isReady) {
    return (
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <TabContainer />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  } else {
    return null;
  }
}
