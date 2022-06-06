let lengthTrip = 1; //by default

export async function formHandler (event) {
	event.preventDefault();
	
	let cityInputValue = document.getElementById('city').value;
	let departureDate = document.getElementById('start-date').value;
	let nameOfPlace = cityInputValue.replace(/,?\s+/g, '-'); // Regex to remove white spaces or commas
	let returnDate = document.getElementById('end-date').value;
	
	if(departureDate && cityInputValue){
		if(returnDate){
			lengthTrip = Client.getLengthTrip(departureDate, returnDate);
		}
		getForecast({ nameOfPlace, departureDate, lengthTrip  });
		document.getElementById("results").style.display = "flex";
	} else {
		alert('Make sure you selected the city and/or your departure date')
	}
}

/* Function to get data from server */
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

	/* Using Math.floor on decimal numbers */
	/* Some values are being added with their corresponding icon */
	document.getElementById("nameofplace").innerHTML = 	document.getElementById('city').value;
	document.getElementById("temperature").innerHTML = `${Math.floor(weatherData.weatherData[0].temp)}°`;
	document.getElementById("departure-date").innerHTML = Client.convertToLongDate(weatherData.weatherData[0].datetime);
	document.getElementById("temp-like").innerHTML = `${Math.floor(weatherData.weatherData[0].app_max_temp)}°`;
	document.getElementById("min-temp").innerHTML = `<i class="fa-solid fa-temperature-low"></i> Min temp: ${Math.floor(weatherData.weatherData[0].min_temp)}°`;
	document.getElementById("max-temp").innerHTML = `<i class="fa-solid fa-temperature-high"></i> Max temp: ${Math.floor(weatherData.weatherData[0].max_temp)}°`;
	document.getElementById("wind").innerHTML = `<i class="fa-solid fa-wind"></i> Wind: ${Math.floor(weatherData.weatherData[0].wind_spd)} MPH`;
	document.getElementById("precipitation").innerHTML = `<i class="fa-solid fa-cloud-rain"></i> Precipitation: ${Math.floor(weatherData.weatherData[0].pop)}%`;
	document.getElementById("sunrise").innerHTML = `<i class="fa-regular fa-clock"></i> Sunrise: ${Client.convertTime(weatherData.weatherData[0].sunrise_ts)} hrs.`;
	document.getElementById("sunset").innerHTML = `<i class="fa-solid fa-clock"></i> Sunset: ${Client.convertTime(weatherData.weatherData[0].sunset_ts)} hrs.`;
	document.getElementById("uv-index").innerHTML = `<i class="fa-solid fa-sun"></i> UV Index: ${Math.floor(weatherData.weatherData[0].uv)} of 10`;
	document.getElementById("cloud-cover").innerHTML = `<i class="fa-solid fa-cloud"></i> Cloud cover: ${Math.floor(weatherData.weatherData[0].clouds)}%`;
	document.getElementById("length").innerHTML = `${lengthTrip} days`;
	document.getElementById("first-sec").style.backgroundImage = `url(${weatherData.image})`;

	/* When the trip length is for 2 days or more, the following function will be executed 
	to display the forecast for those days */
	if (lengthTrip > 1) {
		Client.displayMoreForecast(weatherData.weatherData);
		document.getElementById("other-days").style.visibility = "visible";
	}
}