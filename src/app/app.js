import '../style/style.scss';
import Controls from './controls/controls.js';
import Weather from './weather/weather.js';
import Map from './map/map.js';


window.onload = () => {
  const app = new App();
  app.initApp();
};

class App {
  constructor() {
    this.controls = new Controls(this.doChangesFromControls.bind(this));
    this.weather = new Weather();
    this.map = new Map();
  }

  initApp() {
    this.initRoot();
    this.root.append(this.controls.render());
    this.root.append(this.weather.render());
    this.root.append(this.map.render());
  }

  doChangesFromControls(){
    console.log('Changes');
  }

  initRoot(){
    const body = document.querySelector('body');
    this.root = document.createElement('div');
    this.root.setAttribute('id', 'root');
    body.prepend(this.root);
  }

}