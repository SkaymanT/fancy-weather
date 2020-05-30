import RefreshButton from './refresh-button';
import MenuLanguage from './menu-language';
import TemperatureScale from './temperature-scale';
import Search from './search';

export default class Controls {
  search: Search;
  refreshButton: RefreshButton;
  menuLanguage: MenuLanguage;
  temperatureScale: TemperatureScale;
  controlsContainer: HTMLDivElement;

  constructor(doChanges: Function, doChangeBackground: Function, doChangeLanguage: Function, doChangeScale: Function) {
    this.search = new Search(doChanges);
    this.refreshButton = new RefreshButton(doChangeBackground);
    this.menuLanguage = new MenuLanguage(doChangeLanguage);
    this.temperatureScale = new TemperatureScale(doChangeScale);
  }

  public render(text: Array<string>): HTMLDivElement {
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.classList.add('controls-container');
    this.controlsContainer.append(this.getControlsButtons());
    this.controlsContainer.append(this.search.render(text));

    return this.controlsContainer;
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