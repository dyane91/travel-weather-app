// export function checkDates () {
//     for(let i = 0; i < 7; i++){
//         //this returns the date in format YYYY-MM-DD
//         today.toISOString().split('T')[0];
//         if(departureDate === today){
//             console.log(`It's within a week`);
//         } else {
//             today.setDate(today.getDate() + 1);
//             i++;
//         }
//     }
// }

export function checkDates (startDate) {
	// let departureDate = document.querySelector('input[type="date"]').value; //it's in format YYYY-MM-DD
	let today = new Date();
	for(let i = 0; i < 7; i++){
		//this returns the date in format YYYY-MM-DD
		let newformat = today.toISOString().split('T')[0];
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
	if (departDay < returnDay) {
		console.log("Bien, fechas validas")
	} else {
		alert('Your return date cannot be before your departure :) Check again!')
	}
}
