interface OnLoadAble {
  onload: any;
  onerror: any;
}
export default class Map {

  mapContainer: HTMLDivElement;
  KEYMAPAPI: string;

  constructor() {
    this.KEYMAPAPI = 'AIzaSyBWWZnqHV3asW7DM3yCQ0dxSHjj_J9LkwE';
  }

  public async render(lat: string, lng: string, language: string): Promise<HTMLDivElement> {
    this.mapContainer = document.createElement('div');
    this.mapContainer.classList.add('map-container');
    this.mapContainer.append(await this.getMap(lat, lng, language));
    this.mapContainer.append(this.getCoordinates(lat, lng, language));
    return this.mapContainer;
  }

  public async updateLocation(lat: string, lng: string, language: string): Promise<void> {
    let mapIframe = this.mapContainer.querySelector('.map-iframe') as HTMLIFrameElement;
    console.log(mapIframe);
    mapIframe.src = `https://www.google.com/maps/embed/v1/place?q=${lat},${lng}&zoom=11&key=${this.KEYMAPAPI}&language=${language}`;
    await this.wait(5000);
    console.log(mapIframe);
    let coordinatesContainer = this.mapContainer.querySelectorAll('.map-container__coordinates>p') as NodeListOf<HTMLParagraphElement>;
    const coordinates = this.updateCoordinates(lat, lng, language);
    coordinatesContainer[0].innerText = coordinates[0];
    coordinatesContainer[1].innerText = coordinates[1];
  }

  async wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  private onloadPromise<T extends OnLoadAble>(obj: T): Promise<T> {
    console.log('123123');
    return new Promise((resolve, reject) => {
      obj.onload = () => resolve(obj);
      obj.onerror = reject;
    });
  }



  private async addIframeProcess(src): Promise<void> {
    let iframe = document.createElement('iframe');
    console.log('ss112');
    // let mapIframe = this.mapContainer.querySelector('.map-iframe') as HTMLIFrameElement;
    iframe.src = src;
    console.log(iframe);
    let iframepromise = this.onloadPromise(iframe);
    console.log(iframepromise);
    await iframepromise;
    console.log('Ура работает');
    //что-то делаем
  }

  private async getMap(lat: string, lng: string, language: string): Promise<HTMLDivElement> {
    const mapContainer = document.createElement('div');
    mapContainer.classList.add('map-container__mask');
    const mapIframe = document.createElement('iframe');
    mapIframe.classList.add('map-iframe');
    mapIframe.src = `https://www.google.com/maps/embed/v1/place?q=${lat},${lng}&zoom=11&key=${this.KEYMAPAPI}&language=${language}`;
    mapContainer.append(mapIframe);
    return mapContainer;
  }

  private getCoordinates(lat: string, lng: string, language: string): HTMLDivElement {
    const coordinatesContainer = document.createElement('div');
    coordinatesContainer.classList.add('map-container__coordinates');
    const xCoordinates = document.createElement('p');
    const coordinates = this.updateCoordinates(lat, lng, language);
    xCoordinates.innerText = coordinates[0];
    coordinatesContainer.append(xCoordinates);
    const yCoordinates = document.createElement('p');
    yCoordinates.innerText = coordinates[1];
    coordinatesContainer.append(yCoordinates);
    return coordinatesContainer;
  }

  private updateCoordinates(lat: string, lng: string, language: string): Array<string> {
    switch (language) {
      case 'be': {
        const coordinates = [`Шырата: ${lat.substr(0, 2)}° ${lat.substr(3, 2)}'`, `Даўгата: ${lng.substr(0, 2)}° ${lng.substr(3, 2)}'`];

        return coordinates;
      }
      case 'ru': {
        const coordinates = [`Широта: ${lat.substr(0, 2)}° ${lat.substr(3, 2)}'`, `Долгота: ${lng.substr(0, 2)}° ${lng.substr(3, 2)}'`];
        return coordinates;
      }
      default: {
        const coordinates = [`Latitude: ${lat.substr(0, 2)}° ${lat.substr(3, 2)}'`, `Longitude: ${lng.substr(0, 2)}° ${lng.substr(3, 2)}'`];
        return coordinates;
      }
    }
  }




}