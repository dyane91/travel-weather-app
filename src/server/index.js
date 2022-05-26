const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const fetch = require("node-fetch");

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static('./dist'))

console.log(__dirname)

//Object that will store only necessary data of the selected place to the frontend
let placeData = {};

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

app.get('/forecast', (req, res) => {
	const params = req.params;
});

app.get('/', function (req, res) {
	res.sendFile('dist/index.html')
});

// app.post('/placeInfo', async function (req, res) {
// 	const response = await fetch(`http://api.geonames.org/searchJSON?q=${req.body.nameOfPlace}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`);
// 	const data = await response.json();
// 	try {
// 		placeData = {
// 			latitude: data.geonames[0].lat,
// 			longitude: data.geonames[0].lng,
// 			country: data.geonames[0].countryName
// 		}
// 		console.log('Object: ', placeData)
// 		res.send(placeData);
// 	} catch (error) {
// 		console.error('Error communicating to Geonames API in server');
// 	}
// });

app.post('/forecast', async function (req, res){
	console.log('INSIDE FORECAST PATH')
	let departure = req.body.departureDate;
	let lengthTrip = req.body.lengthTrip;

	/* Call to GeonamesAPI to get latitude and longitude of location */
	const response = await fetch(`http://api.geonames.org/searchJSON?q=${req.body.nameOfPlace}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`);
	const data = await response.json();
	const lat = data.geonames[0].lat;
	const long = data.geonames[0].lng;

	/* Call to Weatherbit API to get forecast */
	const respWeather = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${long}&key=${process.env.WEATHERBIT_API_KEY}&units=I`)
	const weatherData = await respWeather.json();

	let forecast = new Array;
	let dateArrApi = weatherData.data; //its length will always be 15 because it returns 16-days forecast

	for(let i = 0; i < dateArrApi.length; i++){
		// Once startDate matches the api based on the date
		if(departure === dateArrApi[i].datetime){
			if(lengthTrip > 1) {
				forecast = dateArrApi.slice(i, i + lengthTrip);
				console.log('This is the forecast for many days: ', forecast);
			} else {
				forecast = dateArrApi[i];
				console.log('This is the weather for ONLY ONE day: ', forecast)
				break;
			}
		}
	}
	placeData.weatherData = forecast;

	/* Call to Pixabay API to get pictures */
	const respPixabay = await fetch(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${req.body.nameOfPlace}&image_type=photo&pretty=true&category=places`)
	const dataPic = await respPixabay.json();

	if(dataPic.hits.length){
		placeData.image = dataPic.hits[0].largeImageURL;
	} 
	
	console.log('DATA DEL LUGAR: ', placeData)
	res.send(placeData);
});