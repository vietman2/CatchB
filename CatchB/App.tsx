import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TourGuideProvider } from "rn-tourguide";

import TabContainer from "./src/containers/Base/TabStack";
import useFonts from "./src/hooks/useFonts";
import { store } from "./src/store/store";
import { themeColors } from ".themes/colors";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...themeColors,
  },
};

export default function App() {
  const isReady = useFonts();

  if (isReady) {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <TourGuideProvider>
              <NavigationContainer>
                <TabContainer />
              </NavigationContainer>
            </TourGuideProvider>
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    );
  } else {
    return null;
  }
}
