export function isWithinAweek (startDate) {
	let today = new Date();

	/* i is equal to 7 because I want to know if the departure date is within a week (7 days) */
	for(let i = 0; i < 7; i++){
		//this returns the date in format YYYY-MM-DD
		let newformat = Client.convertDate(today);
		if(startDate === newformat){
			console.log(`It's within a week`, newformat);
			getCurrentForecast({isCurrentForecast: 'yes', depart: startDate});
			break;
		} else {
			today.setDate(today.getDate() + 1);
		}
	}
	console.log('Trip is after one week from today')
	getCurrentForecast({isCurrentForecast: 'no'})
}

export function isReturnAfterDeparture (departDay, returnDay) {
	if (departDay > returnDay) {
		alert('Your return date cannot be before your departure :) Check again!')
	}
}
