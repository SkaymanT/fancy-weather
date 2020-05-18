
export default class Search {

  constructor(doChanges) {

    this.doChanges = doChanges;
  }

  render() {
    this.searchContainer = document.createElement('div');
    this.searchContainer.classList.add('search-container');

    // this.searchContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.searchContainer;
  }

  handlerClick(event) {
    // if (this.isClickButtonСlear(event)) {
    //   this.clickButtonСlear();
    // }
  }

 
}