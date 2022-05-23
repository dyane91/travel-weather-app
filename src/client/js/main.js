export function formHandler (e) {
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
		getCurrentForecast({ nameOfPlace, departureDate, lengthTrip,  });
	} else {
		alert('Make sure you selected the city and/or your departure date')
	}
}

//Fetch data from Geonames API to get latitude, longitude, city and country params
const getLatAndLong = async (data) => {
	const request = await fetch('http://localhost:3000/placeInfo',  {
	method: 'POST',
	mode: 'cors',
	credentials: 'same-origin',
	headers: {
		'Content-type': 'application/json'
	},
	body: JSON.stringify(data)
	});
    console.log("frontend: ", request);
}

const getCurrentForecast = async (data) => {
	const request = await fetch('http://localhost:3000/forecast', {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(data)
	});
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

