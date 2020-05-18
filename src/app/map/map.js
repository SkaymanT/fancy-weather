export default class Map {

  constructor() {
  }

  render() {
    this.mapContainer = document.createElement('div');
    this.mapContainer.classList.add('map-container');
  
    // this.mapContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.mapContainer;
  }

  handlerClick(event) {
    
  }

 
}