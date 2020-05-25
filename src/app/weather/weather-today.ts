export default class WeatherToday {

  constructor() {
  }

  render() {
    this.weatherToday = document.createElement('div');
    this.weatherToday.classList.add('weather-today-container');
    
    // this.weatherToday.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.weatherToday;
  }

  handlerClick(event) {
    
  }

 
}