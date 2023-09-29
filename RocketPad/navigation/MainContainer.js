
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

const HomeScreen = 'Home';
const TimelineScreen = 'Timeline';
const LaunchesScreen = 'Launches';
const OrbitsScreen = 'Orbits';
const MapScreen = 'Map';
const OrbitScreen = 'Orbit';
const RocketScreen = 'Rocket';
const FamilyTreeScreen = 'Familytree'


export default function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name='TabNavigator' component={TabNavigator} options={{ headerShown: false }} /> */}
        <Stack.Screen name='TabNavigator' component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name={OrbitScreen} component={Orbit} options={{ headerShown: false }}/>
        <Stack.Screen name={FamilyTreeScreen} component={FamilyTree} options={{ headerShown: false }} />
        <Stack.Screen name={TimelineScreen} component={Timeline}  />
        <Stack.Screen name={RocketScreen} component={Rocket} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {

  return (
    <Tab.Navigator
      initialRouteName={HomeScreen}
      screenOptions={({ route }) => ({
        // tabBarStyle:{height: 80, },
        // tabBarIconStyle: { fontSize: 10},
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
      
      })}

    >
      <Tab.Screen name={HomeScreen} component={Home} options={{ headerShown: false }}/>
      <Tab.Screen name={TimelineScreen} component={Timeline} options={{ headerShown: false }} />
      <Tab.Screen name={LaunchesScreen} component={Launches} options={{ headerShown: false }}/>
      <Tab.Screen name={OrbitsScreen} component={Orbits} options={{ headerShown: false }}/>
      <Tab.Screen name={MapScreen} component={Map} options={{ headerShown: false }}/>
      {/* <Tab.Screen name={RocketScreen} component={Rocket} options={{ headerShown: false, tabBarButton: () => null }}/> */}
      <Tab.Screen name={FamilyTreeScreen} component={FamilyTree} options={{ headerShown: false, tabBarButton: () => null}}/>
    </Tab.Navigator>
  );
}
