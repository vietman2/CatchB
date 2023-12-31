import { createDrawerNavigator } from '@react-navigation/drawer';

import Community from '../../containers/Community/Community';

import { leftTitle, rightTitle } from '../../components/Logos/TopBar';
import { CommunityStackParamList } from '../../variables/navigation';

const CommunityDrawer = createDrawerNavigator<CommunityStackParamList>();

export default function CommunityContainer() {
  return (
    <CommunityDrawer.Navigator
      initialRouteName="CommunityScreen"
      screenOptions={{
        headerLeft: leftTitle,
        headerRight: rightTitle,
        headerTitle: '',
        headerShadowVisible: false,
      }}
    >
      <CommunityDrawer.Screen name="CommunityScreen" component={Community} />
      <CommunityDrawer.Screen name="AnotherScreen" component={Community} />
    </CommunityDrawer.Navigator>
  );
}