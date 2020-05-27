import '../style/style.scss';
import Controls from './controls/controls';
import Weather from './main/weather';
import Map from './main/map';


window.onload = () => {
  const app = new App();
  app.initApp();
};

class App {
  controls: Controls;
  weather: Weather;
  map: Map;
  root: HTMLDivElement;
  KEYIMAGEAPI: string;
  constructor() {
    this.controls = new Controls(this.doChangesFromControls.bind(this), this.doChangeBackground.bind(this), this.doChangeLanguage.bind(this), this.doChangeScale.bind(this));
    this.weather = new Weather(this.doChangesFromControls.bind(this));
    this.map = new Map();
    this.KEYIMAGEAPI = 'GZ3T-OqnbT6kW0m8CccKw-ucz4MaeTsJ29r2rKflNoQ'
  }

  public initApp() {
    this.initRoot();
    this.root.append(this.controls.render());
    this.root.append(this.getMain());
  }

  public doChangesFromControls(text): void {
    console.log('Changes ', text);
  }

  private async doChangeBackground(): Promise<string> {
    const words = 'nature,day,spring,cloudy';
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${words}&client_id=${this.KEYIMAGEAPI}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.urls.full);
      document.querySelector('body').style.cssText = `background-image: url("${data.urls.full}");`;
      return 'res';
    } catch (error) {
      document.querySelector('body').style.cssText = `background-image: url(../assets/img/bg1.png);`;
      return 'res';
    }
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

  private getMain(): HTMLDivElement {
    const main = document.createElement('div');
    main.classList.add('main-container');
    main.append(this.weather.render());
    main.append(this.map.render());
    return main;
  }


}