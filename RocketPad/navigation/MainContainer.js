
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Timeline from './screens/Timeline';
import Home from './screens/Home';
import Rocket from './screens/Rocket';
import Map from './screens/Map';
import Launches from './screens/Launches';
import Orbits from './screens/Orbits';
import Orbit from './screens/Orbit';
import FamilyTree from './screens/FamilyTree';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = 'home';
const TimelineScreen = 'timeline';
const LaunchesScreen = 'launches';
const OrbitsScreen = 'orbits';
const MapScreen = 'map';
const OrbitScreen = 'orbit';
const RocketScreen = 'rocket';
const FamilyTreeScreen = 'familytree'


export default function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name='TabNavigator' component={TabNavigator} options={{ headerShown: false }} /> */}
        <Stack.Screen name='TabNavigator' component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name={RocketScreen} component={Rocket}  />
        <Stack.Screen name={OrbitScreen} component={Orbit} />
        <Stack.Screen name={FamilyTreeScreen} component={FamilyTree} />
        <Stack.Screen name={TimelineScreen} component={Timeline}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={HomeScreen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === HomeScreen) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === TimelineScreen) {
            iconName = focused ? 'timeline-clock' : 'timeline-clock-outline';
          } else if (rn === LaunchesScreen) {
            iconName = focused ? 'rocket' : 'rocket-outline';
          } else if (rn === OrbitsScreen) {
            iconName = focused ? 'orbit' : 'orbit';
          } else if (rn === MapScreen) {
            iconName = focused ? 'map' : 'map-outline';
          }
          

          return <Icon name={iconName} size={size} color={color} />;
        },
        // tabBarVisible: true,
      })}
    >
      <Tab.Screen name={HomeScreen} component={Home} />
      <Tab.Screen name={TimelineScreen} component={Timeline} />
      <Tab.Screen name={LaunchesScreen} component={Launches} />
      <Tab.Screen name={OrbitsScreen} component={Orbits} />
      <Tab.Screen name={MapScreen} component={Map} />
    </Tab.Navigator>
  );
}
