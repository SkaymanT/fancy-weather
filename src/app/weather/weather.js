import WeatherToday from './weather-today';
import WeatherDays from './weather-days';

export default class Weather {

  constructor(doChanges) {
    this.weatherDays = new WeatherDays();
    this.weatherToday = new WeatherToday();
    this.doChanges = doChanges;
  }

  render() {
    this.weatherContainer = document.createElement('div');
    this.weatherContainer.classList.add('weather-container');
    
    this.weatherContainer.append(this.weatherToday.render());
    this.weatherContainer.append(this.weatherDays.render());

    // this.weatherContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.weatherContainer;
  }

  handlerClick(event) {
    
  }

 
}