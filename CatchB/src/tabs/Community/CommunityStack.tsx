import { createStackNavigator } from '@react-navigation/stack';

import Community from './Community';

import { leftTitle, rightTitle } from '../../components/Logos/TopBar';
import { CommunityStackParamList } from '../../variables/navigation';

const CommunityStack = createStackNavigator<CommunityStackParamList>();

export default function CommunityContainer() {
  return (
    <CommunityStack.Navigator
      initialRouteName="CommunityScreen"
      screenOptions={{
        headerLeft: leftTitle,
        headerTitle: () => {
          return "";
        },
        headerRight: rightTitle,
        headerShadowVisible: false,
      }}
    >
      <CommunityStack.Screen name="CommunityScreen" component={Community} />
    </CommunityStack.Navigator>
  );
}