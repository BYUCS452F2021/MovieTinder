import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { retrieveMovieListWithSelections, retrieveWatchProviders } from '../repositories/movieDbRepository';

export const SwipeScreen = ({ route, navigation }) => {
	const [cardsArr, setCardsArr] = useState([]);
	const [watchProviders, setWatchProviders] = useState([]);

	useEffect(() => {
		const { movieListArray } = route.params;
		setCardsArr(movieListArray);
		console.log('HERE I AM', route);
	}, []);

	const getProviders = async movieListArray => {
		let watchProvidersArray = [];
		for (let i = 0; i < movieListArray.movies.length; i++) {
			let watchProviders = await retrieveWatchProviders(movieListArray.movies[i].id);
			watchProvidersArray.push(watchProviders);
		}
		setWatchProviders(watchProvidersArray);
	};

	const retriveInitialData = async () => {
		let movieListArray = await retrieveMovieListWithSelections();
		await getProviders(movieListArray);

		if (movieListArray.success) {
			setCardsArr(movieListArray.movies);
		} else {
			console.log(movieListArray.errorMsg);
		}
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			{cardsArr.length > 0 && (
				<Swiper
					cards={cardsArr}
					horizontalSwipe={false}
					cardVerticalMargin={5}
					verticalThreshold={700 / 5}
					cardHorizontalMargin={5}
					backgroundColor={'#000000'}
					onSwipedTop={() => console.log('Swiped up')}
					onSwipedBottom={() => console.log('Swiped down')}
					showSecondCard={true}
					renderCard={card => {
						return (
							<View
								style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 4,
									borderColor: '#E8E8E8',
									justifyContent: 'center',
									backgroundColor: 'white',
								}}>
								<Image style={{ width: '100%', height: '95%' }} source={{ uri: `https://image.tmdb.org/t/p/original${card.poster_path}` }} />
							</View>
						);
					}}
				/>
			)}
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
