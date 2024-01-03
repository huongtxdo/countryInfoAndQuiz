# Country info and quiz app

An application where I learnt how to use React, fetch data from API, and later style with Material UI (MUI).

With the app, users type in the search box and the app will instantly list the countries that match with the search text when there are 10 or less matches. A newly added feature of capital quiz allows users to test their knowledge by matching the countries with their respective capitals.

## Deployed on Render: <a href="https://country-info-and-capital-quiz.netlify.app/"> Click here </a>

## Tech-Stack

- **React**: A JavaScript library for building user interfaces.
- **Material UI**: A popular CSS framework for building responsive and visually appealing web interfaces.
- **API**: REST Countries, OpenWeather

## Setup

You can clone the project by using the following commands in your terminal:

```
git clone https://github.com/huongtxdo/countryInfoAndQuiz
cd countryInfoAndQuiz
npm install
npm start
```

A seperate API key with <a href="https://home.openweathermap.org/users/sign_up">OpenWeather</a> is required. Upon getting the key, you can set it in your process environment variables (.env file):

```
process.env.REACT_APP_API_KEY
```

