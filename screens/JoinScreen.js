import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, SafeAreaView, Switch, ScrollView, TextInput } from 'react-native';
import { greaterThan } from 'react-native-reanimated';
import { checkGroupCode, createMovieGroup } from '../repositories/apiRepository';
import { retrieveMovieListWithSelections } from '../repositories/movieDbRepository';

export const JoinScreen = ({ route, navigation }) => {
	const [genreList, setGenreList] = useState([]);
	const [users, setUsers] = useState([
		{ id: 1, name: 'Daddy', host: false },
		{ id: 2, name: 'Ammon', host: true },
		{ id: 3, name: 'Spencer', host: false },
		{ id: 4, name: 'jon', host: false },
		{ id: 5, name: 'tom', host: false },
		{ id: 6, name: 'carl', host: false },
		{ id: 7, name: 'mommy', host: false },
		{ id: 8, name: 'dingus', host: false },
		{ id: 9, name: 'nugget', host: false },
	]);
	const [yearsList, setYears] = useState([
		{ id: 1, year: '2020-Present', selected: false },
		{ id: 2, year: '2010-2019', selected: false },
		{ id: 3, year: '2000-2009', selected: false },
		{ id: 4, year: '1990-1999', selected: false },
		{ id: 5, year: 'All', selected: false },
	]);
	const [adultMoviesOnly, setAdultMoviesOnly] = useState(false);
	const [groupCode, setGroupCode] = useState('');
	const [userName, setUserName] = useState('');

	useEffect(() => {
		const { genreList } = route.params;
		setGenreList(genreList);
	}, []);

	const selectStreamingService = service => {
		let services = [...streamingServices];
		for (let i = 0; i < services.length; i++) {
			if (services[i].id === service.id) {
				services[i].selected ? (services[i].selected = false) : (services[i].selected = true);
			}
		}
		setStreamingServices(services);
	};

	const selectGenre = genre => {
		let genres = [...genreList];
		for (let i = 0; i < genres.length; i++) {
			if (genres[i].id === genre.id) {
				genres[i].selected ? (genres[i].selected = false) : (genres[i].selected = true);
			}
		}
		setGenreList(genres);
	};

	const selectYear = year => {
		let years = [...yearsList];
		for (let i = 0; i < years.length; i++) {
			if (years[i].id === year.id) {
				years[i].selected ? (years[i].selected = false) : (years[i].selected = true);
			}
		}
		setYears(years);
	};

	const grabInfoForMovieGroup = () => {
		//check code length
		let errorMessage = '';
		try {
			if(groupCode.length == 6){
				//then check if code is in the database
				if(checkGroupCode() == groupCode){
					navigation.navigate('WaitScreen');
				}
				
			}
			else{
				errorMessage = 'Code needs to be 6 characters';
				throw errorMessage;
			}
		} catch (error) {
			Alert.alert(errorMessage);
		}
	};

	const retriveInitialData = async movieGroupSettings => {
		let movieListObj = await retrieveMovieListWithSelections(movieGroupSettings);
		if (movieListObj.success && movieListObj.movies.length > 0) {
			navigation.navigate('SwipeScreen', { movieListArray: movieListObj.movies });
		}
	};

	return (
		<View style={styles.mainContainer}>
			<Text style={{ fontSize: 50, marginBottom: 20}}>Movie Tinder</Text>
			<View style={styles.codeInput} {...{justifyContent: 'flex-start'}}>
					<Text style={{ fontSize: 30}}>Join Code:</Text>
					<TextInput
						placeholder = "Code"
						placeholderTextColor = "grey"
						autoCapitalize = "none"
						maxLength = '6'
						onChangeText={text => setGroupCode(text)}
						value={groupCode}
						style={styles.inputBox}
					/>
				</View>
				<View style={styles.codeInput}>
					<Text style={{ fontSize: 30 }}>Name:</Text>
					<TextInput
						placeholder = "Billy"
						placeholderTextColor = "grey"
						autoCapitalize = "none"
						maxLength = '20'
						onChangeText={text => setUserName(text)}
						value={userName}
						style={styles.inputBox}
					/>
				</View>

				<View style={styles.streamContainer}>
					<Text style={{ fontSize: 30 }}>Genres</Text>
					<ScrollView horizontal={true}>
						{genreList.map(genre => (
							<TouchableOpacity onPress={() => selectGenre(genre)} key={genre.id} style={{ ...styles.streamButtons, backgroundColor: genre.selected ? 'green' : 'white' }}>
								<Text style={{ fontSize: 15, color: 'black' }}>{genre.name}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				<View style={styles.streamContainer}>
					<Text style={{ fontSize: 30 }}>Years</Text>
					<ScrollView horizontal={true}>
						{yearsList.map(year => (
							<TouchableOpacity onPress={() => selectYear(year)} key={year.id} style={{ ...styles.streamButtons, backgroundColor: year.selected ? 'green' : 'white' }}>
								<Text style={{ fontSize: 15, color: 'black' }}>{year.year}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

			<View style={styles.navigationPanel}>
				<TouchableOpacity style={styles.mainButtons} onPress={() => navigation.navigate('MainScreen')}>
					<Text style={{ fontSize: 15, color: 'black' }}>Cancel</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.mainButtons}
					onPress={() => {
						grabInfoForMovieGroup();
					}}>
					<Text style={{ fontSize: 15, color: 'black' }}>Create Group</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'column',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		backgroundColor: '#FFFFFF',
	},
	mainTitle: {
		flexDirection: 'row',
		fontSize: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 35,
		marginBottom: 40,
		fontSize: 100,
	},
	mainButtons: {
		width: 150,
		backgroundColor: 'white',
		margin: 10,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		borderRadius: 10,
		borderColor: 'black',
		borderWidth: 2,
	},
	navigationPanel: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	streamContainer: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	streamButtons: {
		width: 140,
		backgroundColor: 'black',
		margin: 20,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		borderRadius: 10,
		borderColor: 'black',
		borderWidth: 2,
	},
	userList: {
		flexDirection: 'column',
		width: '80%',
		backgroundColor: 'green',
		height: 100,
		borderColor: 'black',
	},
	userName: {
		backgroundColor: 'purple',
		fontSize: 50,
	},
	codeInput: {
		marginBottom: 50,
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	inputBox: {
		borderWidth: 1.5,
		borderColor: 'black',
		width: '30%',
		marginLeft: 10,
	},
});
