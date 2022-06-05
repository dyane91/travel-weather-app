export let dates = {};

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let next16Days = new Date();
next16Days.setDate(next16Days.getDate() + 15);

/* Function to convert a date to string in format yyyy-mm-dd */
export const convertDate = (date) => date.toISOString().split('T')[0]

dates.today = convertDate(today);
dates.tomorrow = convertDate(tomorrow);
dates.day16th = convertDate(next16Days);

/* Function to convert timestamp to time in format HH:MM */
export const convertTime = (timestamp) => {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${hours}:${minutes}`;
}

export const convertToLongDate = (date) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let d = new Date(date);
    let longDate = `${months[d.getMonth()]} ${d.getDate()+1}, ${d.getFullYear()}`
    return longDate; 
}

export function displayMoreForecast (weatherData) {
    let parentDiv = document.getElementById("more-forecast");

    for (let i = 1; i < weatherData.length; i++){
        parentDiv.insertAdjacentHTML('beforeend', `<div class="additional">
            <div id="date">${weatherData[i].valid_date}</div>
            <div id="min-temp" class="col"><span>Lowest T°</span>${weatherData[i].min_temp}°</div>
            <div id="max-temp" class="col"><span>Highest T°</span>${weatherData[i].max_temp}°</div>
            <div id="rainy" class="col"><span>Rainy</span>${weatherData[i].pop}%</div>
            <div id="humidity" class="col"><span>Humidity</span>${weatherData[i].rh}%</div>
        </div>`);
    }
    // document.getElementById("other-days").style.display = "flex";
}