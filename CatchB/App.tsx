import { NavigationContainer } from "@react-navigation/native";

import BaseContainer from "./containers/BaseContainer";

export default function App() {
  /*
  if (로그인 === false) {
    return (
      <로그인화면 />
    )
  }
  else {
    */
  return (
    <NavigationContainer>
      <BaseContainer />
    </NavigationContainer>
    
  );
  
  //}
}
