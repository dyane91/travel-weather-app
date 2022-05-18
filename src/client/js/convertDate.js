export let dates = {};

/* Function to convert a date to string in format yyyy-mm-dd */
let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let next16Days = new Date();
next16Days.setDate(next16Days.getDate() + 15);

function convertDate (date) {
    // let year = date.getFullYear();
    // let month = date.getMonth() + 1; // Months start at 0
    // let day = date.getDate();
    
    // if (day < 10) day = '0' + day;
    // if (month < 10) month = '0' + month;

    // let dateFormat = `${year}-${month}-${day}`;
    // return dateFormat;
    return date.toISOString().split('T')[0]
}

dates.today = convertDate(today);
dates.tomorrow = convertDate(tomorrow);
dates.day16th = convertDate(next16Days);