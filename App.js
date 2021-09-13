import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AppLoading from 'expo-app-loading';
import shortid from 'shortid';

import { JoinScreen } from './screens/JoinScreen';
import { MainScreen } from './screens/MainScreen';
import { HostScreen } from './screens/HostScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { SwipeScreen } from './screens/SwipeScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { WaitScreen } from './screens/WaitScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
	const [isLoadingComplete, setLoadingComplete] = useState(false);

	const loadResourcesAsync = async () => {
		// Add userSettings to local storage if they dont have an stored already.
		const userSettings = await AsyncStorage.getItem('@movieTinder:userSettings');
		if (userSettings === null) {
			const newUserSettings = {
				userId: `USER-${shortid.generate()}`,
				colorScheme: 'Dark',
				host: false,
				// Can add other properties here
			};

			await AsyncStorage.setItem('@movieTinder:userSettings', JSON.stringify(newUserSettings));
		}
		// AsyncStorage.clear(); //<-- this will nuke local storage. don't run this unless you want to delete ALL the user's stuff.
	};

	const handleFinishLoading = () => {
		setTimeout(() => {
			setLoadingComplete(true);
		}, 1000);
	};

	const InAppStack = createStackNavigator();

	const InAppStackNav = () => {
		return (
			<InAppStack.Navigator>
				<InAppStack.Screen
					options={{
						headerShown: false,
						// headerTitle: () => <MyComp />,
						// headerTintColor: '#000000',
						// headerBackTitle: 'Back'
					}}
					name='MainScreen'
					component={MainScreen}
				/>
				<InAppStack.Screen
					options={{
						headerShown: false,
					}}
					name='HostScreen'
					component={HostScreen}
				/>
				<InAppStack.Screen options={{ headerShown: false }} name='JoinScreen' component={JoinScreen} />
				<InAppStack.Screen name='ResultsScreen' component={ResultsScreen} />
				<InAppStack.Screen
					options={{
						headerShown: false,
					}}
					name='SettingsScreen'
					component={SettingsScreen}
				/>
				<InAppStack.Screen name='SwipeScreen' component={SwipeScreen} />
				<InAppStack.Screen name='WaitScreen' component={WaitScreen} />
			</InAppStack.Navigator>
		);
	};

	const Tab = createBottomTabNavigator();

	if (!isLoadingComplete) {
		return (
			<View>
				<ActivityIndicator style={{ marginTop: '50%' }} size='large' color='#000000' />
				<AppLoading onError={error => console.log(error)} startAsync={loadResourcesAsync} onFinish={() => handleFinishLoading()} />
			</View>
		);
	} else {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
				<NavigationContainer>
					<Tab.Navigator initialRouteName='MainScreen'>
						<Tab.Screen
							options={{
								tabBarVisible: false,
							}}
							name='InApp'
							component={InAppStackNav}
						/>
					</Tab.Navigator>
				</NavigationContainer>
			</SafeAreaView>
		);
	}
}
