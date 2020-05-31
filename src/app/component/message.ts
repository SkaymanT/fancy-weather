export function getMessage(text: Array<string>): HTMLDivElement {
  let messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container');
  messageContainer.classList.add('message');
  // messageContainer.classList.add('open');
  let message = document.createElement('div');
  message.classList.add('message');

  let messageInfo = document.createElement('div');
  messageInfo.classList.add('message-info');
  message.append(messageInfo);
  messageContainer.append(message);

  let buttonClose = document.createElement('button');
  buttonClose.classList.add('message-info__button-close');
  buttonClose.innerText = '×';
  messageInfo.append(buttonClose);

  let infoHeader = document.createElement('div');
  infoHeader.classList.add('info-header');

  let infoContainer = document.createElement('div');
  infoContainer.classList.add('info-container');

  messageInfo.append(infoContainer);

  return messageContainer;
}

export function openMessage(): HTMLDivElement {
  let footer = document.createElement('div');
  footer.classList.add('footer-container');
  let keyValue = `<div class="ticker"><p class="ticker__item"></p><p class="ticker__item">Панядзелак :</p><p class="ticker__item">7° - 15°</p><p class="ticker__item">Невялікая воблачнасць на працягу ўсяго дня</p><p class="ticker__item">Вецер: 6 м/с</p><p class="ticker__item">Вільготнасць: 51%</p><p class="ticker__item"></p><p class="ticker__item"></p><p class="ticker__item">Аўторак :</p><p class="ticker__item">10° - 15°</p><p class="ticker__item">Дождж пачынаецца днём</p><p class="ticker__item">Вецер: 7 м/с</p><p class="ticker__item">Вільготнасць: 65%</p><p class="ticker__item"></p><p class="ticker__item"></p><p class="ticker__item">Серада :</p><p class="ticker__item">9° - 18°</p><p class="ticker__item">Невялікі дождж раніцай</p><p class="ticker__item">Вецер: 4 м/с</p><p class="ticker__item">Вільготнасць: 66%</p><p class="ticker__item"></p><p class="ticker__item"></p><p class="ticker__item">Чацвер :</p><p class="ticker__item">9° - 17°</p><p class="ticker__item">Магчымы невялікі дождж ўвечары</p><p class="ticker__item">Вецер: 2 м/с</p><p class="ticker__item">Вільготнасць: 70%</p><p class="ticker__item"></p><p class="ticker__item"></p><p class="ticker__item">Пятніца :</p><p class="ticker__item">12° - 20°</p><p class="ticker__item">Ясна на працягу ўсяго дня</p><p class="ticker__item">Вецер: 4 м/с</p><p class="ticker__item">Вільготнасць: 63%</p><p class="ticker__item"></p><p class="ticker__item"></p><p class="ticker__item">Субота :</p><p class="ticker__item">12° - 22°</p><p class="ticker__item">Невялікая воблачнасць на працягу ўсяго дня</p><p class="ticker__item">Вецер: 5 м/с</p><p class="ticker__item">Вільготнасць: 54%</p><p class="ticker__item"></p><p class="ticker__item"></p><p class="ticker__item">Нядзеля :</p><p class="ticker__item">13° - 23°</p><p class="ticker__item">Невялікі дождж ноччу</p><p class="ticker__item">Вецер: 5 м/с</p><p class="ticker__item">Вільготнасць: 50%</p><p class="ticker__item"></p></div>`;
  footer.insertAdjacentHTML('beforeend', keyValue);
  return footer;
}

export function updateMessage(): HTMLDivElement {
  let footer = document.createElement('div');
  footer.classList.add('footer-container');
  let keyValue = `<div class="ticker"><p class="ticker__item"></p><p class="ticker__item">Панядзелак :</p><p class="ticker__item">7° - 15°</p><p class="ticker__item">Невялікая воблачнасць на працягу ўсяго дня</p><p class="ticker__item">Вецер: 6 м/с</p><p class="ticker__item">Вільготнасць: 51%</p><p class="ticker__item"></p><p class="ticker__item"></p><p class="ticker__item">Аўторак :</p><p class="ticker__item">10° - 15°</p><p class="ticker__item">Дождж пачынаецца днём</p><p class="ticker__item">Вецер: 7 м/с</p><p class="ticker__item">Вільготнасць: 65%</p><p class="ticker__item"></p><p class="ticker__item"></p><p class="ticker__item">Серада :</p><p class="ticker__item">9° - 18°</p><p class="ticker__item">Невялікі дождж раніцай</p><p class="ticker__item">Вецер: 4 м/с</p><p class="ticker__item">Вільготнасць: 66%</p><p class="ticker__item"></p><p class="ticker__item"></p><p class="ticker__item">Чацвер :</p><p class="ticker__item">9° - 17°</p><p class="ticker__item">Магчымы невялікі дождж ўвечары</p><p class="ticker__item">Вецер: 2 м/с</p><p class="ticker__item">Вільготнасць: 70%</p><p class="ticker__item"></p><p class="ticker__item"></p><p class="ticker__item">Пятніца :</p><p class="ticker__item">12° - 20°</p><p class="ticker__item">Ясна на працягу ўсяго дня</p><p class="ticker__item">Вецер: 4 м/с</p><p class="ticker__item">Вільготнасць: 63%</p><p class="ticker__item"></p><p class="ticker__item"></p><p class="ticker__item">Субота :</p><p class="ticker__item">12° - 22°</p><p class="ticker__item">Невялікая воблачнасць на працягу ўсяго дня</p><p class="ticker__item">Вецер: 5 м/с</p><p class="ticker__item">Вільготнасць: 54%</p><p class="ticker__item"></p><p class="ticker__item"></p><p class="ticker__item">Нядзеля :</p><p class="ticker__item">13° - 23°</p><p class="ticker__item">Невялікі дождж ноччу</p><p class="ticker__item">Вецер: 5 м/с</p><p class="ticker__item">Вільготнасць: 50%</p><p class="ticker__item"></p></div>`;
  footer.insertAdjacentHTML('beforeend', keyValue);
  return footer;
}