import React, { Component } from "react";
import TemperatureInput from "./TemperatureInput";
import "./styles.css";

let BoilingVerdict = props => {
  if (props.celsius >= 100) {
    return <p>The water would boil</p>;
  }

  return <p>The water would not boil</p>;
};

// functions to convert between celsius and fahrenheit
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { temperature: "", scale: "c" };
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature: temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature: temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "c" ? temperature : tryConvert(temperature, toCelsius);
    const fahrenheit =
      scale === "f" ? temperature : tryConvert(temperature, toFahrenheit);
    return (
      <fieldset>
        <BoilingVerdict celsius={parseFloat(celsius)} />
        <div>
          <TemperatureInput
            scale="c"
            temperature={celsius}
            onTemperatureChange={this.handleCelsiusChange}
          />
          <TemperatureInput
            scale="f"
            temperature={fahrenheit}
            onTemperatureChange={this.handleFahrenheitChange}
          />
        </div>
      </fieldset>
    );
  }
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Calculator />
    </div>
  );
}
