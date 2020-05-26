export default class TemperatureScale {
  doChanges: Function;
  temperatureScale: HTMLDivElement;
  list: string[] = ['°F', '°C'];

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
  }

  public render(): HTMLDivElement {
    this.temperatureScale = document.createElement('div');
    this.temperatureScale.classList.add('buttons-scale');

    this.list.forEach(element => {
      const scaleButton = document.createElement('button');
      scaleButton.classList.add(`button--${element.slice(1).toLowerCase()}`);
      scaleButton.classList.add('button');
      scaleButton.classList.add('inactive');
      scaleButton.innerText = element;
      this.temperatureScale.append(scaleButton);
    });

    // this.searchContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.temperatureScale;
  }

  handlerClick() {
    // if (this.isClickButtonСlear(event)) {
    //   this.clickButtonСlear();
    // }
  }
}