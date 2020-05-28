import '../style/style.scss';
import Controls from './controls/controls';
import Weather from './main/weather';
import Map from './main/map';
import { getLoader } from './component/loader';


window.onload = () => {
  const app = new App();
  app.initApp();
};
interface OnLoadAble {
  onload: any;
  onerror: any;
}

class App {
  controls: Controls;
  weather: Weather;
  map: Map;
  root: HTMLDivElement;
  preloader: HTMLDivElement;
  KEYIMAGEAPI: string;
  KEYWEATHER: string;
  KEYGEOlOCATION: string;
  KEYGEOCORDING: string;
  LAT: string;
  LON: string;
  constructor() {
    this.controls = new Controls(this.doChangesFromControls.bind(this), this.doChangeBackground.bind(this), this.doChangeLanguage.bind(this), this.doChangeScale.bind(this));
    this.weather = new Weather(this.doChangesFromControls.bind(this));
    this.map = new Map();
    this.KEYIMAGEAPI = 'GZ3T-OqnbT6kW0m8CccKw-ucz4MaeTsJ29r2rKflNoQ';
    this.KEYWEATHER = 'XJ3A3JAb13JN8sO3MA1vDgyMAXrZJLwb';
    this.KEYGEOlOCATION = 'f7edfcc5ad81b0';
    this.KEYGEOCORDING = '57913d93c3a94107bcf4c29eb5f997c7';
    this.LAT = '55.752';
    this.LON = '37.6156';
  }


  public initApp() {
    this.initPreloader();
    this.initRoot();
    this.root.append(this.controls.render());
    this.root.append(this.getMain());
    this.spinnerOff();
  }

  public async doChangesFromControls(text): Promise<void> {
    await this.doChangesWeather(text);
    await this.doChangesWeather(text);
    await this.doChangesWeather(text);
    console.log('Changes ', text);
  }


  public async doChangesGeocording(text: string): Promise<void> {
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

  public async getGeolocation(text: string): Promise<void> {
    const url = `https://ipinfo.io/json?token=${this.KEYGEOlOCATION}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

    } catch (error) {
      document.querySelector('body').style.cssText = `background-image: url(../assets/img/bg1.png);`;
    }
    console.log('Changes ', text);
  }


  private async doChangesWeather(text: string): Promise<void> {
    const url = `https://api.climacell.co/v3/weather/forecast/daily?lat=${this.LAT}&lon=${this.LON}&unit_system=si&start_time=now&fields=feels_like%2Ctemp%2Chumidity%2Cwind_speed%2Cweather_code&apikey=${this.KEYWEATHER}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      await this.addImageProcess(data.urls.full);
    } catch (error) {
      document.querySelector('body').style.cssText = `background-image: url(../assets/img/bg1.png);`;
    }
    console.log('Changes ', text);
  }




  private async doChangeBackground(): Promise<void> {
    const words = 'nature,day,spring,cloudy';
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${words}&client_id=${this.KEYIMAGEAPI}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      await this.addImageProcess(data.urls.full);
    } catch (error) {
      document.querySelector('body').style.cssText = `background-image: url(../assets/img/bg1.png);`;
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


  public doChangeLanguage(): void {
    console.log('Changes doChangeLanguage');
  }

  public doChangeScale(): void {
    console.log('Changes doChangeScale');
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

  private getMain(): HTMLDivElement {
    const main = document.createElement('div');
    main.classList.add('main-container');
    main.append(this.weather.render());
    main.append(this.map.render());
    return main;
  }

  private async spinnerOff(): Promise<void> {
    let preloader = document.querySelector('.preloader');
    await this.doChangeBackground();
    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
    }
    preloader.classList.add('open');
  }


}