export async function formHandler (e) {
	e.preventDefault();

	let cityInputValue = document.getElementById('city').value;
	let nameOfPlace = cityInputValue.replace(/,?\s+/g, '-'); // Regex to remove white spaces or commas
	let departureDate = document.getElementById('start-date').value;
	let returnDate = document.getElementById('end-date').value;
	let lengthTrip = 1; //by default
	
	if(departureDate && cityInputValue){
		if(returnDate){
			lengthTrip = getLengthTrip(departureDate, returnDate);
		}
		getForecast({ nameOfPlace, departureDate, lengthTrip  });
	 	await forecastInfo();
	} else {
		alert('Make sure you selected the city and/or your departure date')
	}
}

//Fetch data from different apis
const getForecast = async (data) => {
	const request = await fetch('http://localhost:3000/forecast', {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	const weatherData = await request.json();
	console.log('WEATHER: ', weatherData);

	document.getElementById("nameofplace").innerHTML = 	document.getElementById('city').value;
	document.getElementById("temperature").innerHTML = weatherData.weatherData.temp;
	document.getElementById("temp-like").innerHTML = weatherData.weatherData.app_max_temp;
	document.getElementById("min-temp").innerHTML = weatherData.weatherData.min_temp;
	document.getElementById("max-temp").innerHTML = weatherData.weatherData.max_temp;
	document.getElementById("wind").innerHTML = weatherData.weatherData.wind_spd;
	document.getElementById("precipitation").innerHTML = weatherData.weatherData.pop;
	document.getElementById("sunrise").innerHTML = weatherData.weatherData.sunrise_ts;
	document.getElementById("sunset").innerHTML = weatherData.weatherData.sunset_ts;
	// document.getElementById("first-sec").background = url(weatherData.image);

}

const addDays = (date) => {
	let dat = new Date(date);
	dat.setDate(dat.getDate() + 1);
	return dat.toISOString().split('T')[0];
}

const getLengthTrip = (startDate, returnDate) => Math.floor((new Date(returnDate) - new Date(startDate)) / (1000*60*60*24) +1);

const getAllDates = (startDate, endDate) => {
	let dates = [];
	if (endDate){
		/* To validate the return date comes after departure */
		Client.isReturnAfterDeparture(startDate, endDate);
		let currentDate = startDate;
		while (currentDate <= endDate) {
			dates.push(currentDate)
			currentDate = addDays(currentDate);
		}
		console.log("Estos son los dias: ", dates)
		return dates;
	} else {
		console.log('The trip does not have a return date specified')
		dates.push(startDate);
	}
}

const forecastInfo = async () => {
	const response = await fetch('http://localhost:3000/');
	
	try {
		const data = await response.json();
		console.log('Data in front end***:', data)

	} catch (error){
		console.error('Error getting data from server in FE:', error)

	}

}

