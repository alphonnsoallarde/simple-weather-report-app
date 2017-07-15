import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// JSX in ES6
// Using react library
// JSX add XML syntax to Javascript
const API_KEY = '1ea258e6efccc833ae4bbcb0a4f2ea82';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'Quezon City',
      main: '',
      description: '',
      temp: '',
      temp_min: '',
      temp_max: '',
      wind: ''
    }
  }

  componentDidMount() {
    this.grabWeather(this.state.city);
  }
  // grabbing data while re-rendering the application state
  // allows run code when the app fully renders on the screen

  grabWeather(city) {
    const url = `${ROOT_URL}&q=${city},ph`;

    fetch(url)
    .then(response => response.json())
    .then(json => {
      this.setState({
        main: json.weather[0].main,
        description: json.weather[0].description,
        temp: json.main.temp,
        temp_min: json.main.temp_min,
        temp_max: json.main.temp_max,
        wind: json.wind.speed
      });
    });
  }

  render() {
    const { city, main, description, temp, temp_min, temp_max, wind } = this.state;
    return (
      <div>
        <h1>Weather Report for today!</h1>
        <h3>{city}</h3>
        <strong>
          <ul>
            <li>Weather: {main}</li>
              <ul>
                <li>Description: {description}</li>
              </ul>
            <li>Temperature: {inCelcius(temp)}</li>
              <ul>
                <li>max: {inCelcius(temp_max)}</li>
                <li>min: {inCelcius(temp_min)}</li>
              </ul>
            <li>Wind Speed: {wind}</li>
          </ul>
        </strong>
      </div>
    )
  }
}

function inCelcius(data) {
  return data - 273.15;
}

ReactDOM.render(<App />, document.getElementById('root'));
