import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, SafeAreaView } from 'react-native';

export const ResultsScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.mainContainer}>
			<Text style={styles.mainTitle}>Results Page</Text>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity style={styles.mainButtons} onPress={() => navigation.navigate('MainScreen')}>
					<Text style={{ fontSize: 20, color: '#fff' }}>Main</Text>
				</TouchableOpacity>
			</View>
			<Text style={{ color: 'grey' }}>Copyright © 2020 by MovieTinder LLC.</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
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
