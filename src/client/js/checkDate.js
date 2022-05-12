/* To fill in the value of the min attribute (input tag with a type of 'date') with a date string in the 
format yyyy-mm-dd */

let today = new Date();
let tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

function convertDate (date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1; // Months start at 0
    let day = date.getDate();
    
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    let dateFormat = `${month}-${day}-${year}`;
    return dateFormat;
}


document.addEventListener('DOMContentLoaded', function (){
    document.getElementById('start-date').min = convertDate(today);
    console.log('Today is:', convertDate(today) )
    document.getElementById('end-date').min = convertDate(tomorrow);
    console.log('Tomorrow is:', convertDate(tomorrow) )
});
