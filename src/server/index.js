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

app.get('/', function (req, res) {
	res.sendFile('dist/index.html')
});

app.post('/placeInfo', async function (req, res) {
	const response = await fetch(`http://api.geonames.org/searchJSON?q=${req.body.nameOfPlace}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`);
	const data = await response.json();
	try {
		placeData = {
			latitude: data.geonames[0].lat,
			longitude: data.geonames[0].lng,
			country: data.geonames[0].countryName
		}
		console.log('Object: ', placeData)
		res.send(placeData);
	} catch (error) {
		console.error('Error communicating to Geonames API in server');
	}
})