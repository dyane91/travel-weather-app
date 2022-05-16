/* Function to convert a date to string in format yyyy-mm-dd */

export function convertDate (date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1; // Months start at 0
    let day = date.getDate();
    
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    let dateFormat = `${month}-${day}-${year}`;
    return dateFormat;
}