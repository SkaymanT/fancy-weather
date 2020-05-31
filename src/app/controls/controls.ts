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

  constructor(doChanges: Function, doChangeBackground: Function, doChangeLanguage: Function, doChangeScale: Function, listLanguage: Array<string>, listScale: Array<string>) {
    this.search = new Search(doChanges);
    this.refreshButton = new RefreshButton(doChangeBackground);
    this.menuLanguage = new MenuLanguage(doChangeLanguage, listLanguage);
    this.temperatureScale = new TemperatureScale(doChangeScale, listScale);
  }

  public render(text: Array<string>, language: string, scale: string): HTMLDivElement {
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.classList.add('controls-container');
    this.controlsContainer.append(this.getControlsButtons(scale, language));
    this.controlsContainer.append(this.search.render(text));

    return this.controlsContainer;
  }

  private getControlsButtons(scale: string, language: string): HTMLDivElement {
    const main = document.createElement('div');
    main.classList.add('controls-btns-container');
    main.append(this.refreshButton.render());
    main.append(this.menuLanguage.render(language));
    main.append(this.temperatureScale.render(scale));
    return main;
  }

}