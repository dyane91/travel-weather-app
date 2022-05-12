//Regex to remove white space or commas from input value to be used on the api call
const cityInputValue = document.getElementById('city').value;
console.log('The city is:', cityInputValue);
let nameOfPlace = cityInputValue.replace(/,?\s+/g, '-');

export function formHandler (e) {
    let cityInputValue = document.getElementById('city').value;
    let nameOfPlace = cityInputValue.replace(/,?\s+/g, '-');
    e.preventDefault();
    console.log('The city in frontend is: ',cityInputValue)
    getLatAndLong({nameOfPlace});
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
