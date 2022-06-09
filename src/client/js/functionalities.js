/* Since WeatherbitAPI returns the forecast for the next 16 days only, 
users can only select a date in between that range. This 'dates' object stores today, tomorrow, 
and the 16th day to fill in the values (min, max) of <input type="date"> */
export let dates = {};

/* Function to convert a date to string in format yyyy-mm-dd */
export const convertDate = (date) => date.toISOString().split('T')[0];

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let next16Days = new Date();
next16Days.setDate(next16Days.getDate() + 15);

dates.today = convertDate(today);
dates.tomorrow = convertDate(tomorrow);
dates.day16th = convertDate(next16Days);

/* Function to check that return date comes after departure */
export function isReturnAfterDeparture (departDay, returnDay) {
	if (departDay > returnDay) {
		alert('Your return date cannot be before your departure :) Check again!')
	}
}

/* Function that will return the length of the trip */
export const getLengthTrip = (startDate, returnDate) => Math.floor((new Date(returnDate) - new Date(startDate)) / (1000*60*60*24) +1);

/* Function to convert timestamp to time in format HH:MM */
export const convertTime = (timestamp) => {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${hours}:${minutes}`;
}

/* Function to convert a date in format 'yyyy-mm-dd' to 'Month Day, Year' */
export const convertToLongDate = (date) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let d = new Date(date);
    let longDate = `${months[d.getMonth()]} ${d.getDate()+1}, ${d.getFullYear()}`
    return longDate; 
}

/* Function that will inject this html portion with forecast info if the trip length is 2 days or more */
export function displayMoreForecast (weatherData) {
    const parentDiv = document.getElementById("more-forecast");

    while(parentDiv.lastElementChild) {
        parentDiv.removeChild(parentDiv.lastElementChild);
    }

    for (let i = 1; i < weatherData.length; i++){
        parentDiv.insertAdjacentHTML('beforeend', `<div class="additional">
            <div id="date">${weatherData[i].valid_date}</div>
            <div id="min-temp" class="col"><span>Lowest T°</span>${weatherData[i].min_temp}°</div>
            <div id="max-temp" class="col"><span>Highest T°</span>${weatherData[i].max_temp}°</div>
            <div id="rainy" class="col"><span>Rainy</span>${weatherData[i].pop}%</div>
            <div id="humidity" class="col"><span>Humidity</span>${weatherData[i].rh}%</div>
        </div>`);
    }
}