const createMovieGroup = async (groupSettings) => {
	console.log(process.env.EXPO_IP)
	console.log('hitt', `http://${process.env.EXPO_IP}:8000/createMovieGroup`, groupSettings)
	try {
		await fetch(`http://${process.env.EXPO_IP}:8000/createMovieGroup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(groupSettings),
		})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data);
			});
	} catch (error) {
		console.log(error);
	}
};

const checkGroupCode = async (groupCode) => {
	console.log('hitt', `http://${process.env.EXPO_IP}:8000/getCollectionByCode`, groupCode)
	try {
		await fetch(`http://${process.env.EXPO_IP}:8000/getCollectionByCode`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(groupCode),
		})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data);
			});
	} catch (error) {
		console.log(error);
	}
};


export { createMovieGroup, checkGroupCode };
