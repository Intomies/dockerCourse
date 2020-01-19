import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
      weatherDescription: "",
      temperature: "",
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    this.setState({icon: weather.weather[0].icon, weatherDescription: weather.weather[0].description, temperature: weather.main.temp.toFixed(1)});
  }

  render() {
    const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    const { icon, weatherDescription, temperature } = this.state;

    return (
      <div className="weatherDiv">
        <img src={iconUrl} alt="icon"/>
        <p>Current Weather: {weatherDescription}</p>
        <p>Current Temperature: {temperature} Degrees Celsius</p>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
