import RefreshButton from './refresh-button';
import MenuLanguage from './menu-language';
import TemperatureScale from './temperature-scale';
import Search from './search';

export default class Controls {
  search: Search;
  refreshButton: RefreshButton;
  menuLanguage: MenuLanguage;
  temperatureScale: TemperatureScale;
  doChanges: Function;
  controlsContainer: HTMLDivElement;

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
    this.search = new Search(doChanges);
    this.refreshButton = new RefreshButton(doChanges);
    this.menuLanguage = new MenuLanguage(doChanges);
    this.temperatureScale = new TemperatureScale(doChanges);
  }

  public render(): HTMLDivElement {
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.classList.add('controls-container');
    this.controlsContainer.append(this.getControlsButtons());
    this.controlsContainer.append(this.search.render());

    // this.controlsContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.controlsContainer;
  }

  handlerClick() {

  }

  private getControlsButtons(): HTMLDivElement {
    const main = document.createElement('div');
    main.classList.add('controls-btns-container');
    main.append(this.refreshButton.render());
    main.append(this.menuLanguage.render());
    main.append(this.temperatureScale.render());
    return main;
  }



}