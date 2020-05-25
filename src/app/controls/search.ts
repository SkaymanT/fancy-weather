
export default class Search {
  doChanges: Function;
  searchContainer: any;

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
  }

  render() {
    this.searchContainer = document.createElement('div');
    this.searchContainer.classList.add('search-container');
    this.searchContainer.classList.add('container');
    this.searchContainer.append(this.initInput());
    this.searchContainer.append(this.initMicro());
    // this.searchContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.searchContainer;
  }

  handlerClick(event) {
    // if (this.isClickButtonСlear(event)) {
    //   this.clickButtonСlear();
    // }
  }

  private initInput(){
    const inputContainer = document.createElement('input');
    inputContainer.classList.add('input-base');
    inputContainer.setAttribute('type', 'search');
    return inputContainer;
  }

  private initMicro(){
    const buttonMicro = document.createElement('div');
    buttonMicro.classList.add('button-micro');
    return buttonMicro;
  }

 
}