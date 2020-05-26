export default class Search {
  doChanges: Function;
  searchContainer: HTMLDivElement;

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
  }

  public render(): HTMLDivElement {
    this.searchContainer = document.createElement('div');
    this.searchContainer.classList.add('search-container');
    this.searchContainer.append(this.getInput());
    this.searchContainer.append(this.getMicro());
    this.searchContainer.append(this.getSearch());
    // this.searchContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.searchContainer;
  }

  handlerClick() {
    // if (this.isClickButtonСlear(event)) {
    //   this.clickButtonСlear();
    // }
  }

  private getInput(): HTMLInputElement {
    const inputContainer = document.createElement('input');
    inputContainer.classList.add('search-input');
    inputContainer.type = 'search';
    inputContainer.name = 'search-city';
    inputContainer.placeholder = "Search city or ZIP";
    inputContainer.required = true;
    return inputContainer;
  }

  private getMicro(): HTMLButtonElement {
    const buttonMicro = document.createElement('button');
    buttonMicro.classList.add('button-micro');
    return buttonMicro;
  }

  private getSearch(): HTMLButtonElement {
    const buttonMicro = document.createElement('button');
    buttonMicro.classList.add('button');
    buttonMicro.classList.add('search-input__button');
    buttonMicro.innerText = 'Search';
    return buttonMicro;
  }

}