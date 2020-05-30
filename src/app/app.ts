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
  constructor() {
    this.controls = new Controls(this.doChangesFromControls.bind(this), this.doChangeBackground.bind(this), this.doChangeLanguage.bind(this), this.doChangeScale.bind(this));
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
    this.textLangEn = ['Incorrect city', 'Please enter a city', 'Search city', 'Search'];
    this.textLangBe = ['Incorrect city', 'Please enter a city', 'Search city', 'Search'];
    this.textLangRu = ['Incorrect city', 'Please enter a city', 'Search city', 'Search'];
  }


  public async initApp(): Promise<void> {
    this.initPreloader();
    this.initRoot();
    this.initControls();
    this.root.append(this.controls.render(this.textLangEn));
    const city = await this.getGeolocation();
    this.root.append(await this.getMain(city));
    this.spinnerOff();
  }

  private initControls(): void {
    switch (localStorage.language.substr(1, 2)) {
      case 'be': {
        this.root.append(this.controls.render(this.textLangBe));
        break;
      }
      case 'ru': {
        this.root.append(this.controls.render(this.textLangRu));
        break;
      }
      default: {
        this.root.append(this.controls.render(this.textLangEn));
        break;
      }
    }
  }

  public async doChangesFromControls(textCity): Promise<void> {
    await this.doChangesWeather(textCity);
    // await this.doChangesGeocording(text);
    // await this.doChangesGeocording(text);
    console.log('Changes ', textCity);
  }

  public doChangeLanguage(): void {
    console.log('Changes doChangeLanguage');
    const textLang = ['sss1', 'sss2', 'sss3', 'sss3'];
    this.controls.search.changedSearch(textLang);
  }

  public doChangeScale(): void {
    console.log('Changes doChangeScale');
  }

  private async getMain(city: string): Promise<HTMLDivElement> {
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
      main.append(this.weather.render(this.getInfoCurrent(data[0].data[0]), forecast, city));
      main.append(await this.map.render(this.LAT, this.LNG, localStorage.language.substr(1, 2)));
    } catch (error) {
      console.log('Error', error);
    }
    return main;
  }

  private async doChangesWeather(city: string): Promise<Array<object>> {
    const masRes = [];
    // const urlCurrent = `https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=${this.KEYWEATHER}`;
    const urlForecast = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=4&units=${this.getCodeScaleForSearch()}&lang=${localStorage.language.substr(1, 2)}&key=${this.KEYFORECAST}`;
    try {
      const resCurrent = await fetch(urlForecast);
      const dataCurrent = await resCurrent.json();
      const res = await fetch(urlForecast);
      const data = await res.json();
      // getInfoCurrent
      data.data.forEach(element => masRes.push(this.getInfoForecast('ss', element)));
      console.log(masRes);
      this.weather.doChangedWeather(masRes, city);
    } catch (error) {
      console.log('Error', error);
    }
    console.log('Changes ', city);
    return masRes;
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


  public async doChangesGeocording(text: string): Promise<void> {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=Moscow&country=RU&days=3&units=S&lang=be&key=619b6dd131094859b162bb2577321b2a`;
    // const url = `https://api.opencagedata.com/geocode/v1/json?q=Minsk&key=${this.KEYGEOCORDING}&pretty=1&no_annotations=1`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

    } catch (error) {
      document.querySelector('body').style.cssText = `background-image: url(../assets/img/bg1.png);`;
    }
    console.log('Changes ', text);
  }

  public async doChangesMap(text: string): Promise<void> {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=Minsk&key=${this.KEYGEOCORDING}&pretty=1&no_annotations=1`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

    } catch (error) {
      document.querySelector('body').style.cssText = `background-image: url(../assets/img/bg1.png);`;
    }
    console.log('Changes ', text);
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

  private async getGeolocation(): Promise<string> {
    const urlLocation = `https://ipinfo.io/json?token=${this.KEYGEOlOCATION}`;
    let city = '';
    try {
      const resLocation = await fetch(urlLocation);
      const dataLocation = await resLocation.json();
      const urlGeocoding = `https://api.opencagedata.com/geocode/v1/json?q=${dataLocation.city}%20${dataLocation.country}&key=${this.KEYGEOCORDING}&pretty=1&no_annotations=1&language=${localStorage.language.substr(1, 2)}`;
      const resGeocoding = await fetch(urlGeocoding);
      const dataGeocoding = await resGeocoding.json();
      city = dataGeocoding.results[0].formatted;
      [this.LAT, this.LNG] = [dataGeocoding.results[0].geometry.lat, dataGeocoding.results[0].geometry.lng];
    } catch (error) {
      console.log('Error', error);
    }
    return city;
  }

  private getCodeScaleForSearch(): string {
    let scale = '';
    if (localStorage.scale.substr(2, 1) === 'F') {
      scale = 'I';
    }
    if (localStorage.scale.substr(2, 1) === 'C') {
      scale = 'M';
    }
    return scale;
  }


}