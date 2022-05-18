export function formHandler (e) {
	e.preventDefault();
	/* Check what text was put into input field and this Regex is to remove white spaces 
	or commas from the value to be used on the api call */
	let cityInputValue = document.getElementById('city').value;
	let nameOfPlace = cityInputValue.replace(/,?\s+/g, '-');
	
	// getLatAndLong({nameOfPlace});
	
	/* logic to check if departure date is within this week or not */ 
	let departureDate = document.getElementById('start-date').value;
	let returnDate = document.getElementById('end-date').value;
	if(departureDate && cityInputValue){
		let dates = [];
		if(returnDate){
			Client.isReturnAfterDeparture(departureDate, returnDate);
			//Calcular el length del trip
			let lengthTrip = Math.floor((new Date(returnDate) - new Date(departureDate)) / (1000*60*60*24) +1);
			console.log('el trip dura: ',lengthTrip)
			//Limpiar este codigo:
			Client.isWithinAweek(departureDate);

		} else {
			dates.push(departureDate);
			console.log('No return date, but departure is on ',dates)
		}
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

