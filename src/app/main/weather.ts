interface CityForecast {
  temp: string,
  icon: string,
  datetime: string,
}

interface CityInfoCurrent {
  temp: string,
  app_temp: string,
  icon: string,
  datetime: string,
  description: string,
  wind_spd: string,
  rh: string,
}
export default class Weather {

  doChanges: Function;
  weatherContainer: HTMLDivElement;

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
  }

  public render(currentWeather: CityInfoCurrent, days: Array<CityForecast>, city: string): HTMLDivElement {
    this.weatherContainer = document.createElement('div');
    this.weatherContainer.classList.add('weather-container');
    this.initWeatherToday(currentWeather, city);
    this.initWeatherDays(days, city);

    return this.weatherContainer;
  }

  public doChangedWeather(days: Array<CityForecast>, city: string): void {

    this.weatherContainer.querySelector('.weather-container__location').innerHTML = city;


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

  private initWeatherToday(day: CityInfoCurrent, city: string): void {
    const location = document.createElement('p');
    location.classList.add('weather-container__location');
    location.innerText = city;
    this.weatherContainer.append(location);


    const dateTime = document.createElement('p');
    dateTime.classList.add('weather-container__date-time');
    dateTime.innerText = day.datetime;
    this.weatherContainer.append(dateTime);

    const temperatureToday = document.createElement('p');
    temperatureToday.classList.add('weather-container__temperature-today');
    temperatureToday.innerText = day.temp;
    this.weatherContainer.append(temperatureToday);

    const weatherIcon = document.createElement('img');
    weatherIcon.classList.add('weather-container__weather-icon');
    weatherIcon.alt = day.description;
    weatherIcon.src = day.icon;
    this.weatherContainer.append(weatherIcon);

    const weatherData = document.createElement('div');
    weatherData.classList.add('weather-container__weather-data');
    const weatherData1 = document.createElement('p');
    weatherData1.innerText = day.description;
    weatherData.append(weatherData1);
    const weatherData2 = document.createElement('p');
    weatherData2.innerText = day.app_temp;
    weatherData.append(weatherData2);
    const weatherData3 = document.createElement('p');
    weatherData3.innerText = day.wind_spd;
    weatherData.append(weatherData3);
    const weatherData4 = document.createElement('p');
    weatherData4.innerText = day.rh;
    weatherData.append(weatherData4);
    this.weatherContainer.append(weatherData);
  }

  private initWeatherDays(days: Array<CityForecast>, city: string): void {
    days.forEach(element => {
      const forecast = document.createElement('div');
      forecast.classList.add('forecast');

      const day = document.createElement('p');
      day.classList.add(`forecast__day`);
      day.innerText = element['datetime'];
      forecast.append(day);

      const temperature = document.createElement('p');
      temperature.classList.add(`forecast__temperature`);
      temperature.innerText = element['temp'];
      forecast.append(temperature);

      const icon = document.createElement('img');
      icon.classList.add(`forecast__icon`);
      icon.src = element['icon'];
      forecast.append(icon);

      this.weatherContainer.append(forecast);
    });
  }
}