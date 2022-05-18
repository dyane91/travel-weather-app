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