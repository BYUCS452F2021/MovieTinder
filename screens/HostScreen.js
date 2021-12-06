import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, SafeAreaView, Switch, ScrollView } from 'react-native';
import shortid from 'shortid';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { createMovieGroup } from '../repositories/apiRepository';
import { retrieveMovieListWithSelections } from '../repositories/movieDbRepository';

export const HostScreen = ({ route, navigation }) => {

	const [genreList, setGenreList] = useState(route.params.genreList);
	const [users, setUsers] = useState([
		{ id: 1, name: 'Daddy', host: false },
		{ id: 2, name: 'Ammon', host: true },
		{ id: 3, name: 'Spencer', host: false },
		{ id: 4, name: 'jon', host: false },
		{ id: 5, name: 'tom', host: false },
		{ id: 6, name: 'carl', host: false },
		{ id: 7, name: 'mommy', host: false },
	]);
	
	const [streamingServices, setStreamingServices] = useState([
		{ id: 1, service: 'Netflix', selected: false },
		{ id: 2, service: 'Hulu', selected: false },
		{ id: 3, service: 'Disney Plus', selected: false },
		{ id: 4, service: 'Amazon Prime', selected: false },
		{ id: 5, service: 'HBO Max', selected: false },
	]);
	const [yearsList, setYears] = useState([
		{ id: 1, year: '2020-Present', selected: false },
		{ id: 2, year: '2010-2019', selected: false },
		{ id: 3, year: '2000-2009', selected: false },
		{ id: 4, year: '1990-1999', selected: false },
		{ id: 5, year: 'All', selected: false },
	]);
	const [loadingOverlay, setLoadingOverlay] = useState(false);

	const generateGropCode = async () => {
		shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ?!');
		return shortid.generate().slice(0, -3).toLocaleLowerCase();
	};

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

	const grabInfoForMovieGroup = async () => {
		let selecteStreamingServices = streamingServices.filter(service => service.selected);
		let selectedGenres = genreList.filter(genre => genre.selected);
		let selectedYears = yearsList.filter(year => year.selected);
		let code = await generateGropCode();

		const userSettings = await AsyncStorage.getItem('@movieTinder:userSettings');
		let parsedUserSettings = JSON.parse(userSettings);
		if (!parsedUserSettings.host) {
			await AsyncStorage.setItem('@movieTinder:userSettings', JSON.stringify({ ...parsedUserSettings, host: true }));
		}

		let storedUserObj = {
			userId: parsedUserSettings.userId,
			host: true,
			userName: 'Billy',
		};

		let movieGroupSettings = {
			users: [{ ...storedUserObj }],
			streamingServices: selecteStreamingServices,
			years: selectedYears,
			genres: [...selectedGenres],
			code: code,
		};
		createMovieGroup(movieGroupSettings);
		retriveInitialData(movieGroupSettings);
		navigation.navigate('SettingsScreen', { data: movieGroupSettings });
	};

	const retriveInitialData = async movieGroupSettings => {
		let movieListObj = await retrieveMovieListWithSelections(movieGroupSettings);
		if (movieListObj.success && movieListObj.movies.length > 0) {
			//console.log('OBJ', movieListObj);
			navigation.navigate('SwipeScreen', { movieListArray: movieListObj.movies });
			//navigation.navigate('SettingsScreen');
		}
	};

	return (
		<View style={styles.mainContainer}>
			<Text style={{ fontSize: 50 }}>Movie Tinder</Text>
			<ScrollView>
				<View style={styles.streamContainer}>
					<Text style={{ fontSize: 30 }}>Streaming Services</Text>
					<ScrollView horizontal={true}>
						{streamingServices.map(service => (
							<TouchableOpacity onPress={() => selectStreamingService(service)} key={service.id} style={{ ...styles.streamButtons, backgroundColor: service.selected ? 'green' : 'grey' }}>
								<Text style={{ fontSize: 15, color: 'black' }}>{service.service}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
				<View style={styles.streamContainer}>
					<Text style={{ fontSize: 30 }}>Genres</Text>
					<ScrollView horizontal={true}>
						{genreList.map(genre => (
							<TouchableOpacity onPress={() => selectGenre(genre)} key={genre.id} style={{ ...styles.streamButtons, backgroundColor: genre.selected ? 'green' : 'grey' }}>
								<Text style={{ fontSize: 15, color: 'black' }}>{genre.name}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				<View style={styles.streamContainer}>
					<Text style={{ fontSize: 30 }}>Years</Text>
					<ScrollView horizontal={true}>
						{yearsList.map(year => (
							<TouchableOpacity onPress={() => selectYear(year)} key={year.id} style={{ ...styles.streamButtons, backgroundColor: year.selected ? 'green' : 'grey' }}>
								<Text style={{ fontSize: 15, color: 'black' }}>{year.year}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</ScrollView>

			<View style={styles.navigationPanel}>
				<TouchableOpacity style={styles.mainButtons} onPress={() => navigation.navigate('MainScreen')}>
					<Text style={{ fontSize: 15, color: '#fff' }}>Cancel</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.mainButtons}
					onPress={() => {
						grabInfoForMovieGroup();
					}}>
					<Text style={{ fontSize: 15, color: '#fff' }}>Create Group</Text>
				</TouchableOpacity>
			</View>
			<LoadingOverlay visible={loadingOverlay} toggleFunc={() => setLoadingOverlay(!loadingOverlay)} />
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
		fontSize: 100,
	},
	mainButtons: {
		width: 150,
		backgroundColor: 'grey',
		margin: 10,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		borderRadius: 10,
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
});
