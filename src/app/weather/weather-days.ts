export default class WeatherDays {
  constructor() {
  }

  render() {
    this.weatherToday = document.createElement('div');
    this.weatherToday.classList.add('weather-days-container');
    
    // this.controlsContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.weatherToday;
  }

  handlerClick(event) {
    
  }

 
}