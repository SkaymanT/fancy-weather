export default class MenuLanguage {
  doChanges: Function;
  menuLanguage: HTMLDivElement;
  list: string[] = ['en', 'ru', 'be', 'kz'];

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
  }

  public render(): HTMLDivElement {
    this.menuLanguage = document.createElement('div');
    this.menuLanguage.classList.add('menu-language');
    const buttonDroplist = document.createElement('button');
    buttonDroplist.classList.add('droplist-base');
    buttonDroplist.classList.add('button');
    const spanName = document.createElement('span');
    spanName.innerText = this.list[0];
    buttonDroplist.append(spanName);
    const spanArrow = document.createElement('span');
    spanArrow.classList.add('arrow-down');
    buttonDroplist.append(spanArrow);

    const menuDropDown = document.createElement('div');
    menuDropDown.classList.add('drop-down-menu');
    this.list.forEach(element => {
      const buttonOption = document.createElement('button');
      buttonOption.classList.add('drop-down-menu__item');
      buttonOption.classList.add('button');
      buttonOption.id = element;
      buttonOption.innerText = element;
      menuDropDown.append(buttonOption);
    });
    this.menuLanguage.append(buttonDroplist);
    this.menuLanguage.append(menuDropDown);
    // this.searchContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.menuLanguage;
  }

  handlerClick() {
    // if (this.isClickButtonСlear(event)) {
    //   this.clickButtonСlear();
    // }
  }
}