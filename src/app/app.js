import '../style/style.scss';


window.onload = () => {
  const page = new Page();
  page.createPage();
};

class Page {
  constructor() {
    this.isMode = true;
    this.numberCategory = 0;
    this.trueWord = '';
    this.arrayWordsForGame = [];
    this.isWin = true;
    this.numberErrors = 0;
  }

  createPage() {
    const body = document.querySelector('body');
    this.root = document.createElement('div');
    this.root.setAttribute('id', 'root');

    this.appcontainer = document.createElement('div');
    this.appcontainer.classList.add('app-container');

    this.header = document.createElement('div');
    this.header.classList.add('header-container');

    this.container = document.createElement('div');
    this.container.classList.add('container');

    this.appcontainer.append(this.header);
    this.appcontainer.append(this.container);
    this.root.append(this.appcontainer);
    body.prepend(this.root);
  }

}