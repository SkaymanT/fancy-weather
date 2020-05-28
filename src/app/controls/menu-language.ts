export default class MenuLanguage {
  doChanges: Function;
  menuLanguage: HTMLDivElement;
  list: string[] = ['en', 'ru', 'be'];

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
    if (localStorage.language) {
      spanName.innerText = localStorage.getItem('language').substr(1, 2);
    } else {
      spanName.innerText = this.list[0];
    }
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
      if (localStorage.language.substr(1, 2) !== element) {
        buttonOption.classList.add('inactive');
      }
      buttonOption.id = element;
      buttonOption.innerText = element;
      menuDropDown.append(buttonOption);
    });
    this.menuLanguage.append(buttonDroplist);
    this.menuLanguage.append(menuDropDown);
    this.menuLanguage.addEventListener('click', (event) => this.handlerClick(event));

    return this.menuLanguage;
  }

  private handlerClick(event): void {
    if (this.isClickButtonMenuLanguage(event)) {
      this.clickButtonMenuLanguage(event);
    }
    if (this.isClickButtonLanguage(event)) {
      this.clickButtonLanguage(event);
    }
  }

  private isClickButtonMenuLanguage(event): boolean {
    return event.target.classList.contains('droplist-base') || event.target.parentNode.classList.contains('droplist-base');
  }

  clickButtonMenuLanguage(event): void {
    if (this.menuLanguage.querySelector('.droplist-base').classList.contains('droplist-base-open')) {
      this.menuLanguage.querySelector('.droplist-base').classList.remove('droplist-base-open');
      this.menuLanguage.querySelector('.arrow-down').classList.remove('arrow-down-open');
      this.menuLanguage.querySelector('.drop-down-menu').classList.remove('drop-down-menu--open');
    } else {
      this.menuLanguage.querySelector('.droplist-base').classList.add('droplist-base-open');
      this.menuLanguage.querySelector('.arrow-down').classList.add('arrow-down-open');
      this.menuLanguage.querySelector('.drop-down-menu').classList.add('drop-down-menu--open');
    }

  }

  private isClickButtonLanguage(event): boolean {
    return event.target.classList.contains('drop-down-menu') || event.target.parentNode.classList.contains('drop-down-menu');
  }

  async clickButtonLanguage(event): Promise<string> {
    if (this.menuLanguage.querySelector('.drop-down-menu').classList.contains('drop-down-menu--open')) {
      this.menuLanguage.querySelector('.droplist-base').classList.remove('droplist-base-open');
      this.menuLanguage.querySelector('.arrow-down').classList.remove('arrow-down-open');
      this.menuLanguage.querySelector('.drop-down-menu').classList.remove('drop-down-menu--open');
      this.menuLanguage.querySelectorAll('.drop-down-menu__item').forEach(element => {
        element.classList.add('inactive');
      });
      localStorage.setItem('language', JSON.stringify(event.target.innerHTML));
      event.target.classList.remove('inactive');
      this.menuLanguage.querySelector('.droplist-base>span').innerHTML = event.target.innerHTML;
      await this.doChanges();
    }

    return 'end';
  }
}