import React, {Component} from "react";
import Form from "./component/Form";
import Weather from "./component/Weather";

const API_KEY = "385f1dd11af10a6945b3cb7a3c8f2fba";


class App extends Component {
  state = {
    tempreature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: ""
  }

  getWeather = async (e)  => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${API_KEY}`);
    const result = await api.json();

    if(city && country) {
      this.setState({
        tempreature: result.main.temp,
        city: result.name,
        country: result.sys.country,
        humidity: result.main.humidity,
        description: result.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        tempreature: "",
        city: "",
        country: "",
        humidity: "",
        description: "",
        error: "Please Enter City and Country!"
      });
    }
  }
  render() {
    return (
      <div className="App">
        <div className="form-container">
        <header>Weather App</header>
          <Form getWeather={this.getWeather}/>
          <Weather
            tempreature = {this.state.tempreature}
            city = {this.state.city}
            country = {this.state.country}
            humidity = {this.state.humidity}
            description = {this.state.description}
            error = {this.state.error}
          />
        </div>
      </div>
    )
  }
}

export default App;
