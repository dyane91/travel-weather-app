export function formHandler (e) {
    /* Check what text was put into input field and this Regex is to remove white space 
    or commas from the value to be used on the api call */
    let cityInputValue = document.getElementById('city').value;
    let nameOfPlace = cityInputValue.replace(/,?\s+/g, '-');
    e.preventDefault();
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