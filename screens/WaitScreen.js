import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { retrieveGenreList } from '../repositories/movieDbRepository';

export const WaitScreen = ({ navigation }) => {
	const [genreList, setGenreList] = useState([]);

	useEffect(() => {
		retriveInitialData();
	}, []);

	const retriveInitialData = async () => {
		// Grab Genre list from movieDb API.
		let genreListArr = await retrieveGenreList();
		
		if (genreListArr.success) {
			setGenreList(genreListArr.genres);
		} else {
			console.log(genreListArr.errorMsg);
		}
		const userSettings = await AsyncStorage.getItem('@movieTinder:userSettings');
		let parsedUserSettings = JSON.parse(userSettings);
		console.log(parsedUserSettings);
	};

	return (
		<View style={styles.mainContainer}>
			<Text style={{fontSize: 20, marginTop: 150}}>Waiting for Host to Begin Swipathon</Text>

			<Text style={{ color: 'grey' }}>Copyright © 2021 by MovieTinder LLC.</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        
	},
	buttonsContainer: {
		flexDirection: 'column',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: '50%',
	},
	mainTitle: {
		fontSize: 40,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 35,
	},
	mainButtons: {
		width: '40%',
		backgroundColor: 'grey',
		margin: 30,
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		borderRadius: 10,
	},
});