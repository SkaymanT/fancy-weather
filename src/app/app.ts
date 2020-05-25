import '../style/style.scss';
import Controls from './controls/controls';
import Weather from './weather/weather';
import Map from './map/map';


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

  initApp() {
    const popover = document.createElement("div");
    console.log('object :>> ', popover);
    this.initRoot();
    this.root.append(this.controls.render());
    this.root.append(this.weather.render());
    this.root.append(this.map.render());
  }

  doChangesFromControls() {
    console.log('Changes');
  }

  initRoot() {
    const body = document.querySelector('body')!;
    this.root = document.createElement('div');
    this.root.setAttribute('id', 'root');
    body.prepend(this.root);
  }

}