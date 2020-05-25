export default class WeatherDays {

  weatherDays: any;
  constructor() {
  }

  render() {
    this.weatherDays = document.createElement('div');
    this.weatherDays.classList.add('weather-days-container');
    
    // this.controlsContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.weatherDays;
  }

  handlerClick() {
    
  }

 
}