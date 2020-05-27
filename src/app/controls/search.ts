import Micro from './micro';
export default class Search {
  doChanges: Function;
  searchContainer: HTMLDivElement;
  micro: Micro;

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
    this.micro = new Micro(doChanges);
  }

  public render(): HTMLDivElement {
    this.searchContainer = document.createElement('div');
    this.searchContainer.classList.add('search-container');
    this.searchContainer.append(this.getInput());
    this.searchContainer.append(this.micro.getMicro());
    this.searchContainer.append(this.getSearch());
    this.searchContainer.addEventListener('click', (event) => this.handlerClick(event));

    return this.searchContainer;
  }

  private handlerClick(event): void {
    if (this.isClickButtonMicro(event)) {
      this.clickButtonMicro();
    }

    if (this.isClickButtonSearch(event)) {
      this.clickButtonSearch();
    }
  }

  private isClickButtonSearch(event): boolean {
    return event.target.classList.contains('search-input__button');
  }

  private clickButtonSearch(): void {
    console.log('click');
    let inputElement = this.searchContainer.querySelector('.search-input') as HTMLInputElement;
    let value = inputElement.value;
    if (this.validationInput(value)) {
      return;
    }
    this.doChanges(value);
  }

  private validationInput(input): boolean {
    let regEnglish = /[A-Za-z0-9]/i;
    let regRusBel = /[А-Яа-я0-9]/i;
    let inputElement = this.searchContainer.querySelector('.search-input') as HTMLInputElement;
    if (localStorage.language === '"en"' || localStorage.language === undefined) {
      if (regRusBel.test(input)) {
        inputElement.placeholder = 'Please enter the correct city';
        inputElement.value = '';
      }
      if (input == '') {
        inputElement.placeholder = 'Please enter a city';
        return;
      }
      return;
    }
    if (localStorage.language === '"ru"') {
      if (regEnglish.test(input)) {
        inputElement.placeholder = 'Введите корректный город';
        inputElement.value = '';
      }
      if (input == '') {
        inputElement.placeholder = 'Пожалуйста введите город';
        inputElement.value = '';
        return;
      }
      return;
    }

    if (localStorage.language === '"be"') {
      if (regEnglish.test(input)) {
        inputElement.placeholder = 'Упішыце горад';
        inputElement.value = '';
      }
      if (input == '') {
        inputElement.placeholder = 'Упішыце верны горад';
        inputElement.value = '';
        return;
      }
      return;
    }
  }

  private isClickButtonMicro(event): boolean {
    return event.target.classList.contains('button-micro');
  }

  private clickButtonMicro(): void {
    if (this.micro.checkedisOnMicro(this.searchContainer)) {
      this.micro.onMicro(this.searchContainer.querySelector('.search-input'));
    } else {
      this.micro.offMicro();
    }
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

  private getSearch(): HTMLButtonElement {
    const buttonMicro = document.createElement('button');
    buttonMicro.classList.add('button');
    buttonMicro.classList.add('search-input__button');
    buttonMicro.innerText = 'Search';
    return buttonMicro;
  }

}