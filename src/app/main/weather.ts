export default class Weather {

  doChanges: Function;
  weatherContainer: HTMLDivElement;

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
  }

  public render(): HTMLDivElement {
    this.weatherContainer = document.createElement('div');
    this.weatherContainer.classList.add('weather-container');
    this.initWeatherToday();
    this.initWeatherDays();

    // this.weatherContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.weatherContainer;
  }

  handlerClick() {

  }

  private initWeatherToday(): void {
    const location = document.createElement('p');
    location.classList.add('weather-container__location');
    location.innerText = 'Minsk, Belarus';
    this.weatherContainer.append(location);


    const dateTime = document.createElement('p');
    dateTime.classList.add('weather-container__date-time');
    dateTime.innerText = 'Tue 26 May 14:31';
    this.weatherContainer.append(dateTime);

    const temperatureToday = document.createElement('p');
    temperatureToday.classList.add('weather-container__temperature-today');
    temperatureToday.innerText = '18';
    this.weatherContainer.append(temperatureToday);

    const weatherIcon = document.createElement('img');
    weatherIcon.classList.add('weather-container__weather-icon');
    weatherIcon.alt = 'clear-day';
    weatherIcon.src = 'https://fancy-weather-lhk.surge.sh/img/clear-day.png';
    this.weatherContainer.append(weatherIcon);

    const weatherData = document.createElement('div');
    weatherData.classList.add('weather-container__weather-data');
    const weatherData1 = document.createElement('p');
    weatherData1.innerText = 'Clear';
    weatherData.append(weatherData1);
    const weatherData2 = document.createElement('p');
    weatherData2.innerText = 'Feels Like: 18°';
    weatherData.append(weatherData2);
    const weatherData3 = document.createElement('p');
    weatherData3.innerText = 'Wind: 4 m/s';
    weatherData.append(weatherData3);
    const weatherData4 = document.createElement('p');
    weatherData4.innerText = 'Humidity: 49%';
    weatherData.append(weatherData4);
    this.weatherContainer.append(weatherData);
  }

  private initWeatherDays(): void {

    interface IForecast {
      day: string;
      temperature: string;
      icon: string;
    }

    const list: Array<IForecast> = [{ day: 'Wednesday', temperature: '14', icon: 'https://fancy-weather-lhk.surge.sh/img/partly-cloudy-day.png' }, { day: 'Wednesday', temperature: '14', icon: 'https://fancy-weather-lhk.surge.sh/img/partly-cloudy-day.png' }, { day: 'Wednesday', temperature: '14', icon: 'https://fancy-weather-lhk.surge.sh/img/partly-cloudy-day.png' }];
    list.forEach(element => {
      const forecast = document.createElement('div');
      forecast.classList.add('forecast');
      for (const key in element) {
        if (key === 'icon') {
          const weatherData1 = document.createElement('img');
          weatherData1.classList.add(`forecast__${key}`);
          weatherData1.src = element[key];
          forecast.append(weatherData1);
        } if (key === 'temperature') {
          const weatherData1 = document.createElement('p');
          weatherData1.classList.add(`forecast__${key}`);
          weatherData1.innerText = element[key];
          forecast.append(weatherData1);
        }
        if (key === 'day') {
          const weatherData1 = document.createElement('p');
          weatherData1.classList.add(`forecast__${key}`);
          weatherData1.innerText = element[key];
          forecast.append(weatherData1);
        }
      }

      this.weatherContainer.append(forecast);
    });
  }


}