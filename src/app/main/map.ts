export default class Map {

  mapContainer: HTMLDivElement;
  KEYMAPAPI: string;

  constructor() {
    this.KEYMAPAPI = 'AIzaSyBcBdvaJ9lvN0GrEy8Rl8FniJ521aokVMM';
  }

  public async render(lat: string, lng: string): Promise<HTMLDivElement> {
    this.mapContainer = document.createElement('div');
    this.mapContainer.classList.add('map-container');
    this.mapContainer.append(await this.getMap(lat, lng));
    this.mapContainer.append(this.getCoordinates());
    // this.mapContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.mapContainer;
  }

  handlerClick() {

  }

  private async getMap(lat: string, lng: string): Promise<HTMLDivElement> {
    const mapContainer = document.createElement('div');
    mapContainer.classList.add('map-container__map');
    const mapIframe = document.createElement('iframe');
    mapIframe.classList.add('map-iframe');
    const mapGoogle = `https://www.google.com/maps/embed/v1/view?center=${lat},${lng}&zoom=10&key=${this.KEYMAPAPI}&language=${localStorage.language.substr(1, 2)}`;
    console.log(mapGoogle);
    // const resCurrent = await fetch(mapGoogle);
    // const dataCurrent = await resCurrent.json();
    mapIframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.027825350522!2d27.553665612342076!3d53.90536752878621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbd1e082500001%3A0x649c3fa6dba2ecd7!2z0JzRg9C30LXQuSDQuNGB0YLQvtGA0LjQuCDQs9C-0YDQvtC00LAg0JzQuNC90YHQutCw!5e0!3m2!1sru!2sby!4v1580500725354!5m2!1sru!2sby`;
    mapContainer.append(mapIframe);
    return mapContainer;
  }

  private getCoordinates(): HTMLDivElement {
    const coordinatesContainer = document.createElement('div');
    coordinatesContainer.classList.add('map-container__coordinates');
    const xCoordinates = document.createElement('p');
    xCoordinates.innerText = 'Latitude: 53°54';
    coordinatesContainer.append(xCoordinates);
    const yCoordinates = document.createElement('p');
    yCoordinates.innerText = 'Longitude: 27°34';
    coordinatesContainer.append(yCoordinates);
    return coordinatesContainer;
  }


}