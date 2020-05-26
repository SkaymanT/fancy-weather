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
  root: any;
  constructor() {
    this.controls = new Controls(this.doChangesFromControls.bind(this));
    this.weather = new Weather(this.doChangesFromControls.bind(this));
    this.map = new Map();
  }

  public initApp() {
    this.initRoot();
    this.root.append(this.controls.render());
    this.root.append(this.getMain());
  }

  public doChangesFromControls() {
    console.log('Changes');
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