import '../style/style.scss';
import Controls from './controls/controls';
import Weather from './main/weather';
import Map from './main/map';
import { getLoader } from './component/loader';
import { getDate, getWeekDays } from './component/week';


window.onload = () => {
  const app = new App();
  app.initApp();
  window.setInterval(app.weather.refreshTime, 1000);
};

interface OnLoadAble {
  onload: any;
  onerror: any;
}

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

class App {
  controls: Controls;
  weather: Weather;
  map: Map;
  root: HTMLDivElement;
  preloader: HTMLDivElement;
  KEYIMAGEAPI: string;
  KEYCURRENT: string;
  KEYFORECAST: string;
  KEYGEOlOCATION: string;
  KEYGEOCORDING: string;
  KEYMAPAPI: string;
  LAT: string;
  LNG: string;
  timezone: string;
  textLangEn: Array<string>;
  textLangRu: Array<string>;
  textLangBe: Array<string>;
  city: string;
  listLanguage: Array<string>;
  listScale: Array<string>;
  constructor() {
    this.listScale = ['°F', '°C'];
    this.listLanguage = ['en', 'ru', 'be'];
    this.controls = new Controls(this.doChangesFromControls.bind(this), this.doChangeBackground.bind(this), this.doChangeLanguage.bind(this), this.doChangeScale.bind(this), this.listLanguage, this.listScale);
    this.weather = new Weather(this.doChangesFromControls.bind(this));
    this.map = new Map();
    this.KEYIMAGEAPI = 'GZ3T-OqnbT6kW0m8CccKw-ucz4MaeTsJ29r2rKflNoQ';
    this.KEYCURRENT = '20fe2091eb094bb1890cccc4ec32592f';
    this.KEYFORECAST = '324abe064a5d4a98a54f513199af142b';
    this.KEYGEOlOCATION = 'f7edfcc5ad81b0';
    this.KEYGEOCORDING = '57913d93c3a94107bcf4c29eb5f997c7';
    this.LAT = '55.752';
    this.LNG = '37.6156';
    this.KEYMAPAPI = 'AIzaSyBcBdvaJ9lvN0GrEy8Rl8FniJ521aokVMM';
    this.timezone = '';
    this.textLangEn = ['Incorrect data', 'Search city', 'Search'];
    this.textLangBe = ['Няслушныя дадзеныя', 'Знайсци горад', 'Пошук'];
    this.textLangRu = ['Неверные данные', 'Найти город', 'Поиск'];
    this.city = 'Minsk';
  }


  public async initApp(): Promise<void> {
    this.initPreloader();
    this.initRoot();
    if (!localStorage.scale) {
      localStorage.setItem('scale', JSON.stringify(this.listScale[1]));
    }

    this.root.append(this.controls.render(this.defineLanguage(), localStorage.language.substr(1, 2), localStorage.scale.substr(1, 2)));
    this.root.append(await this.getMain());
    this.spinnerOff();
  }

  public async doChangesFromControls(textCity): Promise<void> {
    this.city = textCity;
    await this.doChangesWeather();
    this.map.updateLocation(this.LAT, this.LNG, localStorage.language.substr(1, 2));
    console.log('Search ', this.city);
  }

  public doChangeLanguage(language): void {
    if (!localStorage.scale) {
      localStorage.setItem('language', JSON.stringify(this.listLanguage[0]));
    } else {
      localStorage.setItem('language', JSON.stringify(language));
    }
    this.controls.search.changedSearch(this.defineLanguage());
    this.doChangesWeather();
    this.map.updateLocation(this.LAT, this.LNG, localStorage.language.substr(1, 2));
  }

  public doChangeScale(scale): void {
    if (!localStorage.scale) {
      localStorage.setItem('scale', JSON.stringify(this.listScale[1]));
    } else {
      localStorage.setItem('scale', JSON.stringify(scale));
    }
    this.doChangesWeather();
  }

  private async getMain(): Promise<HTMLDivElement> {
    this.city = await this.getMyGeolocation();
    const main = document.createElement('div');
    main.classList.add('main-container');
    const forecast: CityForecast[] = [];
    const urlCurrent = `https://api.weatherbit.io/v2.0/current?&lat=${this.LAT}&lon=${this.LNG}&units=${this.getCodeScaleForSearch()}&lang=${localStorage.language.substr(1, 2)}&key=${this.KEYCURRENT}`;
    const urlForecast = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${this.LAT}&lon=${this.LNG}&days=4&units=${this.getCodeScaleForSearch()}&lang=${localStorage.language.substr(1, 2)}&key=${this.KEYFORECAST}`;
    try {
      let requests = [fetch(urlCurrent), fetch(urlForecast)];
      const responses = await Promise.all(requests);
      const data = await Promise.all(responses.map(r => r.json()));
      const days = getWeekDays(data[1].timezone);
      data[1].data.forEach((element, index) => {
        if (index !== 0) {
          forecast.push(this.getInfoForecast(days[index - 1], element));
        }
      });
      main.append(this.weather.render(this.getInfoCurrent(data[0].data[0]), forecast, this.city));
      main.append(await this.map.render(this.LAT, this.LNG, localStorage.language.substr(1, 2)));
    } catch (error) {
      console.log('Error', error);
    }
    return main;
  }

  private async doChangesWeather(): Promise<void> {
    this.city = await this.getGeolocationCity(this.city);
    const forecast: CityForecast[] = [];
    const urlCurrent = `https://api.weatherbit.io/v2.0/current?&lat=${this.LAT}&lon=${this.LNG}&units=${this.getCodeScaleForSearch()}&lang=${localStorage.language.substr(1, 2)}&key=${this.KEYCURRENT}`;
    const urlForecast = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${this.LAT}&lon=${this.LNG}&days=4&units=${this.getCodeScaleForSearch()}&lang=${localStorage.language.substr(1, 2)}&key=${this.KEYFORECAST}`;
    try {
      let requests = [fetch(urlCurrent), fetch(urlForecast)];
      const responses = await Promise.all(requests);
      const data = await Promise.all(responses.map(r => r.json()));
      const days = getWeekDays(data[1].timezone);
      data[1].data.forEach((element, index) => {
        if (index !== 0) {
          forecast.push(this.getInfoForecast(days[index - 1], element));
        }
      });
      this.weather.doChangedWeather(this.getInfoCurrent(data[0].data[0]), forecast, this.city);
    } catch (error) {
      console.log('Error', error);
    }
  }

  private getInfoCurrent(data: any): CityInfoCurrent {
    switch (localStorage.language.substr(1, 2)) {
      case 'be': {
        const objBe: CityInfoCurrent = {
          temp: data.temp.toFixed(),
          app_temp: `АДЧУВАЕЦЦА ЯК: ${data.app_temp.toFixed()} °`,
          icon: `../assets/icon/${data.weather.icon}.svg`,
          datetime: getDate(data.timezone),
          description: data.weather.description,
          wind_spd: `ВЕЦЕР: ${data.wind_spd.toFixed()} м/с`,
          rh: `ВІЛЬГОТНАСЦЬ: ${data.rh}%`,
        }
        return objBe;
      }
      case 'ru': {
        const objRu: CityInfoCurrent = {
          temp: data.temp.toFixed(),
          app_temp: `ОЩУЩАЕТСЯ КАК: ${data.app_temp.toFixed()} °`,
          icon: `../assets/icon/${data.weather.icon}.svg`,
          datetime: getDate(data.timezone),
          description: data.weather.description,
          wind_spd: `ВЕТЕР: ${data.wind_spd.toFixed()} м/с`,
          rh: `ВЛАЖНОСТЬ: ${data.rh}%`,
        }
        return objRu;
      }
      default: {
        const objEn: CityInfoCurrent = {
          temp: data.temp.toFixed(),
          app_temp: `FEELS LIKE: ${data.app_temp.toFixed()} °`,
          icon: `../assets/icon/${data.weather.icon}.svg`,
          datetime: getDate(data.timezone),
          description: data.weather.description,
          wind_spd: `WIND: ${data.wind_spd.toFixed()} m/s`,
          rh: `HUMIDITY: ${data.rh}%`,
        }
        return objEn;
      }
    }
  }

  private getInfoForecast(day: string, data: any): CityForecast {
    switch (localStorage.language.substr(1, 2)) {
      case 'be': {
        const objBe: CityForecast = {
          temp: data.temp.toFixed(),
          datetime: day,
          icon: `../assets/icon/${data.weather.icon}.svg`,
        }
        return objBe;
      }
      case 'ru': {
        const objRu: CityForecast = {
          datetime: day,
          temp: data.temp.toFixed(),
          icon: `../assets/icon/${data.weather.icon}.svg`,
        }
        return objRu;
      }
      default: {
        const objEn: CityForecast = {
          datetime: day,
          temp: data.temp.toFixed(),
          icon: `../assets/icon/${data.weather.icon}.svg`,
        }
        return objEn;
      }
    }
  }

  private async doChangeBackground(): Promise<void> {
    const words = `nature,day,rain`;
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${words}&client_id=${this.KEYIMAGEAPI}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      await this.addImageProcess(data.urls.full);
    } catch (error) {
      document.querySelector('body').style.cssText = `background-image: url(../assets/img/bg2.png);`;
    }
  }

  private onloadPromise<T extends OnLoadAble>(obj: T): Promise<T> {
    return new Promise((resolve, reject) => {
      obj.onload = () => resolve(obj);
      obj.onerror = reject;
    });
  }

  private async addImageProcess(src): Promise<void> {
    let img = new Image();
    img.src = src;
    let imgpromise = this.onloadPromise(img);
    await imgpromise;
    document.querySelector('body').style.backgroundImage = `url(${src})`;
  }

  private initRoot(): void {
    const body = document.querySelector('body')!;
    this.root = document.createElement('div');
    this.root.setAttribute('id', 'root');
    body.prepend(this.root);
  }

  private initPreloader(): void {
    const body = document.querySelector('body')!;
    body.prepend(getLoader());
  }

  private async spinnerOff(): Promise<void> {
    let preloader = document.querySelector('.preloader');
    await this.doChangeBackground();
    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
    }
    preloader.classList.add('open');
  }

  private async getMyGeolocation(): Promise<string> {
    const urlLocation = `https://ipinfo.io/json?token=${this.KEYGEOlOCATION}`;
    let city = '';
    try {
      const resLocation = await fetch(urlLocation);
      const dataLocation = await resLocation.json();
      const urlGeocoding = `https://api.opencagedata.com/geocode/v1/json?q=${dataLocation.city}%20${dataLocation.country}&key=${this.KEYGEOCORDING}&pretty=1&no_annotations=1&language=${localStorage.language.substr(1, 2)}`;
      const resGeocoding = await fetch(urlGeocoding);
      const dataGeocoding = await resGeocoding.json();
      city = dataGeocoding.results[0].formatted;
      [this.LAT, this.LNG] = [dataGeocoding.results[0].geometry.lat.toString(), dataGeocoding.results[0].geometry.lng.toString()];
    } catch (error) {
      console.log('Error', error);
    }
    return city;
  }

  private async getGeolocationCity(city: string): Promise<string> {
    try {
      const urlGeocoding = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${this.KEYGEOCORDING}&pretty=1&no_annotations=1&language=${localStorage.language.substr(1, 2)}`;
      const resGeocoding = await fetch(urlGeocoding);
      const dataGeocoding = await resGeocoding.json();
      city = dataGeocoding.results[0].formatted;
      [this.LAT, this.LNG] = [dataGeocoding.results[0].geometry.lat.toString(), dataGeocoding.results[0].geometry.lng.toString()];
    } catch (error) {
      console.log('Error', error);
    }
    return city;
  }

  private getCodeScaleForSearch(): string {
    let scale = '';
    if (!localStorage.scale) {
      localStorage.setItem('scale', JSON.stringify(this.listScale[0]));
    }
    if (localStorage.scale.substr(2, 1) === 'F') {
      scale = 'I';
    }
    if (localStorage.scale.substr(2, 1) === 'C') {
      scale = 'M';
    }
    return scale;
  }

  private defineLanguage(): Array<string> {
    if (!localStorage.language) {
      localStorage.setItem('language', JSON.stringify(this.listLanguage[0]));
    }
    switch (localStorage.language.substr(1, 2)) {
      case 'be': {
        return this.textLangBe;
      }
      case 'ru': {
        return this.textLangRu;
      }
      default: {
        return this.textLangEn;
      }
    }
  }
}