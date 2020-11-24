import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HistoryScreen from '../screens/HistoryScreen';
import RunmapScreen from '../screens/RunmapScreen';
import StartupScreen from '../screens/StartupScreen';

const MainNavigator = createStackNavigator({
	Startup: StartupScreen,
	Runmap: RunmapScreen,
	History: {
		screen: HistoryScreen,
		navigationOptions: {
			headerShown: true
		}
	}
}, {
	defaultNavigationOptions: {
		headerShown: false
	}
});

export default createAppContainer(MainNavigator);