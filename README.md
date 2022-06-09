# Udacity Capstone Project (Travel App)

## Description
   
This project includes a simple form where the user enters the location they are traveling to and the date they are leaving. Then, the app will display the weather and an image of the location using information obtained from external APIs that depends on each other to work. 

## Extra implementations

* There are required fields such as departure date and location.
* An error message is displayed when the location doesn't exist.
* Return date added to display length of the trip.
* Pull in an image from Pixabay API when the entered location brings up no results.
* Instead of just pulling a single day forecast, the app displays the forecast for multiple days. 

## How do I run the app?

- [ ] First, fork this repo.
- [ ] Go to your project folder:
   ```
   cd <project-folder>
   ```
- [ ] Once you clone, install everything:
   ```
   npm i
   ```
- [ ] Create an account with [Geonames](http://www.geonames.org/export/web-services.html), [Weatherbit](https://www.weatherbit.io/account/create), and [Pixabay](https://pixabay.com/api/docs/) to obtain the API keys.
   
- [ ] To keep the api keys private, we'll create environment variables that will only belong to your local system. Follow the steps below to configure environment variables:
   * Use npm to install the dotenv package - `npm install dotenv`. This will allow us to use environment variables we set in a new file.
   * Create a new `.env` file in the root of your project.
   * Fill the `.env` file with your API keys like this:
      ```
        API_KEY=**************************
      ```
   * Refer to your environment variable putting a prefix `process.env.API_KEY`

- [ ] Start the project by running the command `npm run build-dev` to run it in development mode or `npm run build-prod` and `npm run start` for production mode.
- [ ] Open your browser at http://localhost/3000