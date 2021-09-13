const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config({ path: '../.env' });

const PORT = process.env.SERVER_PORT;
const connection_string = process.env.CONNECTION_STRING;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
	connection_string,
	{
		useUnifiedTopology: true,
	},
	(err, client) => {
		const db = client.db('movieTinder')
		const groupCollection = db.collection('groups')
		// API CALLS TO DB

	app.get('/', function (req, res) {
		const cursor = db.collection('groups').find()
		console.log(cursor)
	});

	app.get('/getCollectionByCode', function (req, res) {
		const cursor = db.collection('groups').find()
		console.log(cursor)
	});
	app.post('/createMovieGroup', (req, res) => {
		groupCollection.insertOne(req.body)
		.then(result => {
		  console.log(result)
		})
		.catch(error => console.error(error))
	})
		if (err) return console.error(err);
		console.log('Connected to DB');
	},
);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
