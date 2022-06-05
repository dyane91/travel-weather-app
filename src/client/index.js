import { formHandler } from "./js/main";
import { dates, convertDate, convertTime, convertToLongDate, displayMoreForecast } from "./js/convertDate";
import { isReturnAfterDeparture } from "./js/checkDeparture";
import './styles/header.scss';
import './styles/main.scss'
import './styles/form.scss'
import './styles/footer.scss';

export { 
    formHandler,
    dates, 
    convertDate,
    convertTime,
    convertToLongDate,
    displayMoreForecast,
    isReturnAfterDeparture
}